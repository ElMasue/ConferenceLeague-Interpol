<script lang="ts">
  import { onMount } from 'svelte';
  import Banner from '$lib/components/Banner.svelte';
  import GameCard from '$lib/components/GameCard.svelte';
  import ResultCard from '$lib/components/ResultCard.svelte';
  import StreakCounter from '$lib/components/StreakCounter.svelte';
  import ShareModal from '$lib/components/ShareModal.svelte';
  import CompletionModal from '$lib/components/CompletionModal.svelte';
  import SettingsModal from '$lib/components/SettingsModal.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { apiService } from '$lib/services/apiService';
  import { currentLanguage } from '$lib/stores/i18n';
  import type { Person } from '$lib/types';

  let currentPerson = $state<Person | null>(null);
  let showResult = $state(false);
  let userAnswer = $state<'conference' | 'interpol' | null>(null);
  let loading = $state(true);
  let streak = $state(0);
  let maxStreak = $state(0);
  let showShareModal = $state(false);
  let showCompletionModal = $state(false);
  let showSettingsModal = $state(false);
  let lastStreakShared = $state(0);
  let usedPersonIds = $state<string[]>([]);
  let previousLanguage = $state<string>('');
  let animationsEnabled = $state(true);

  // Cargar mejor racha desde localStorage e inicializar tema
  onMount(() => {
    const saved = localStorage.getItem('maxStreak');
    maxStreak = saved ? parseInt(saved, 10) : 0;
    
    // Inicializar tema al cargar la página
    const darkMode = localStorage.getItem('darkMode') !== 'false';
    document.documentElement.classList.toggle('light-mode', !darkMode);
    
    // Detectar preferencia de animaciones del sistema si no hay configuración guardada
    const savedAnimations = localStorage.getItem('animationsEnabled');
    
    if (savedAnimations === null) {
      // Si no hay configuración guardada, usar la preferencia del sistema
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      animationsEnabled = !prefersReducedMotion; // Invertido: si prefiere reducir, desactivar animaciones
    } else {
      animationsEnabled = savedAnimations !== 'false';
    }
    
    document.documentElement.classList.toggle('no-animations', !animationsEnabled);
    
    // Guardar idioma inicial
    currentLanguage.subscribe(lang => {
      previousLanguage = lang;
    })();
    
    loadRandomPerson();
  });

  // Guardar mejor racha en localStorage cuando cambie
  $effect(() => {
    localStorage.setItem('maxStreak', maxStreak.toString());
  });

  // Recargar datos cuando cambie el idioma
  $effect(() => {
    const unsubscribe = currentLanguage.subscribe((lang) => {
      if (previousLanguage && previousLanguage !== lang) {
        // Resetear y recargar solo si el idioma realmente cambió
        usedPersonIds = [];
        streak = 0;
        loadRandomPerson();
      }
      previousLanguage = lang;
    });
    return unsubscribe;
  });

  async function loadRandomPerson() {
    loading = true;
    showResult = false;
    userAnswer = null;
    
    // Usar la lista actual de IDs usados
    const person = await apiService.getRandomPerson(usedPersonIds);
    
    // Si no hay más personas, mostrar modal de completación
    if (!person) {
      showCompletionModal = true;
      loading = false;
      return;
    }
    
    currentPerson = person;
    // Agregar el ID de la persona actual a la lista de usados inmediatamente
    usedPersonIds = [...usedPersonIds, person.id];
    loading = false;
  }

  function handleAnswer(answer: 'conference' | 'interpol') {
    userAnswer = answer;
    showResult = true;
    
    const isCorrect = answer === currentPerson?.type;
    
    if (isCorrect) {
      // Acierto: aumentar racha
      streak = streak + 1;
      // Actualizar máxima racha si es necesario
      if (streak > maxStreak) {
        maxStreak = streak;
      }
    } else {
      // Fallo: mostrar modal si racha >= 10 y no se ha compartido esta racha
      if (streak >= 10 && streak !== lastStreakShared) {
        showShareModal = true;
        lastStreakShared = streak;
      }
      // Resetear racha y limpiar personas usadas
      streak = 0;
      usedPersonIds = [];
    }
    
    // Hacer scroll hacia el resultado en móvil y tablet
    // En pantallas grandes no es necesario porque está al lado
    setTimeout(() => {
      if (window.innerWidth < 1024) {
        const resultCard = document.querySelector('.result-card-container');
        if (resultCard) {
          // Si las animaciones están desactivadas, hacer scroll instantáneo y centrado
          const scrollBehavior = animationsEnabled ? 'smooth' : 'auto';
          resultCard.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
        }
      }
    }, animationsEnabled ? 100 : 0);
  }

  function handleNextPerson() {
    // Simplemente cargar la siguiente persona
    // El ID de la persona actual ya fue agregado a usedPersonIds en loadRandomPerson
    loadRandomPerson();
  }

  function handleCloseShareModal() {
    showShareModal = false;
  }

  function handleOpenSettings() {
    showSettingsModal = true;
  }

  function handleCloseSettings() {
    showSettingsModal = false;
  }

  function handleRestart() {
    showCompletionModal = false;
    usedPersonIds = [];
    streak = 0;
    showResult = false;
    userAnswer = null;
    loadRandomPerson();
  }

  const details = $derived(
    currentPerson?.type === 'conference' 
      ? { position: currentPerson.position, team: currentPerson.team }
      : currentPerson?.type === 'interpol'
        ? { crime: currentPerson.crime }
        : {}
  );
</script>

<svelte:head>
  <title>Conference League o Interpol</title>
  <meta name="description" content="¿Futbolista o criminal? Juega y adivina si es un jugador de Conference League o un criminal buscado por Interpol" />
</svelte:head>

<div class="app-container">
  <Banner />
  <button class="settings-button" onclick={handleOpenSettings} title="Configuración">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"/>
      <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <div class="game-content">
    {#if loading || !currentPerson}
      <p style="color: white; font-size: 1.5rem;">Cargando...</p>
    {:else}
      <StreakCounter {streak} {maxStreak} />
      <div class="game-layout">
        <div class="game-card-container {showResult ? 'shifted' : ''}">
          <GameCard 
            imageUrl={currentPerson.imageUrl} 
            onAnswer={handleAnswer}
            {showResult}
            onNext={handleNextPerson}
          />
        </div>
        {#if showResult && userAnswer}
          <div class="result-card-container">
            <ResultCard 
              name={currentPerson.name}
              type={currentPerson.type}
              isCorrect={userAnswer === currentPerson.type}
              {details}
            />
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  {#if showShareModal}
    <ShareModal 
      streak={lastStreakShared}
      onClose={handleCloseShareModal}
    />
  {/if}
  
  {#if showCompletionModal}
    <CompletionModal 
      {streak}
      onRestart={handleRestart}
    />
  {/if}
  
  {#if showSettingsModal}
    <SettingsModal 
      onClose={handleCloseSettings}
    />
  {/if}
  
  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .app-container {
    max-width: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
    min-height: 100vh;
    transition: background 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .app-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  :global(:not(.light-mode)) .app-container::before {
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.05) 0%, transparent 60%);
  }

  :global(.light-mode) .app-container::before {
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(167, 139, 250, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(192, 132, 252, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(237, 233, 254, 0.08) 0%, transparent 60%);
  }

  .game-content {
    padding: 2rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
  }

  .game-layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }

  .game-card-container {
    width: 100%;
    max-width: 600px;
  }

  .result-card-container {
    width: 100%;
    max-width: 600px;
  }

  /* Layout de dos columnas para pantallas Full HD (1920x1080) */
  @media (min-width: 1024px) and (max-width: 1920px) {
    .game-content {
      padding: 0.5rem 1rem;
    }

    .game-layout {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      min-height: 420px;
      margin-top: 0.5rem;
    }

    .game-card-container {
      flex-shrink: 0;
      max-width: 430px;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
      transform: translateX(0);
    }

    /* Con resultado: deslizar a la izquierda */
    .game-card-container.shifted {
      transform: translateX(-225px);
    }

    .result-card-container {
      position: absolute;
      left: 50%;
      top: 0;
      max-width: 430px;
      margin-left: 12px;
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(80px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Desactivar animaciones si el usuario lo prefiere - SOLO EN DESKTOP */
    :global(.no-animations) .game-card-container,
    :global(.no-animations) .result-card-container,
    :global(.no-animations) .game-layout {
      transition: none !important;
      animation: none !important;
    }

    :global(.no-animations) .game-card-container.shifted {
      transform: translateX(-220px) !important;
    }
  }

  /* Layout optimizado para pantallas 2K y superiores (2K+) */
  @media (min-width: 1921px) {
    .game-layout {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      min-height: 600px;
      gap: 0;
    }

    .game-card-container {
      flex-shrink: 0;
      max-width: 550px;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
      transform: translateX(0);
    }

    /* Con resultado: deslizar a la izquierda */
    .game-card-container.shifted {
      transform: translateX(-290px);
    }

    .result-card-container {
      position: absolute;
      left: 50%;
      top: 0;
      max-width: 550px;
      margin-left: 15px;
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Desactivar animaciones si el usuario lo prefiere - SOLO EN DESKTOP */
    :global(.no-animations) .game-card-container,
    :global(.no-animations) .result-card-container,
    :global(.no-animations) .game-layout {
      transition: none !important;
      animation: none !important;
    }

    :global(.no-animations) .game-card-container.shifted {
      transform: translateX(-290px) !important;
    }
  }

  .settings-button {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    background: rgba(42, 42, 42, 0.6);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 100;
    color: #ffffff;
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 215, 0, 0.1);
  }

  :global(.light-mode) .settings-button {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(167, 139, 250, 0.18);
    color: #7c3aed;
    box-shadow: 
      0 8px 24px rgba(167, 139, 250, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .settings-button svg {
    width: 28px;
    height: 28px;
  }

  .settings-button:hover {
    transform: rotate(90deg) scale(1.15);
    background: rgba(42, 42, 42, 0.8);
    box-shadow: 
      0 12px 32px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(255, 215, 0, 0.15),
      inset 0 1px 0 rgba(255, 215, 0, 0.15);
  }

  :global(.light-mode) .settings-button:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 
      0 12px 32px rgba(167, 139, 250, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .settings-button:hover svg {
    filter: brightness(1.3);
  }

  .settings-button:active {
    transform: rotate(90deg) scale(1);
  }

  @media (max-width: 768px) {
    .settings-button svg {
      width: 24px;
      height: 24px;
    }

    .settings-button {
      top: 0.75rem;
      right: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .settings-button svg {
      width: 22px;
      height: 22px;
    }

    .settings-button {
      top: 0.5rem;
      right: 0.5rem;
    }
  }
</style>
