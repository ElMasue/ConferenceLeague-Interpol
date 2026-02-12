<script lang="ts">
  import { currentLanguage, setLanguage, t, type Language } from '$lib/stores/i18n';

  // Helper para detectar si estamos en el navegador
  const browser = typeof window !== 'undefined';

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();

  // Estado de las opciones
  let darkMode = $state(true);
  let language = $state<Language>('es');
  let animationsEnabled = $state(true);

  // Cargar configuración desde localStorage
  if (browser) {
    darkMode = localStorage.getItem('darkMode') !== 'false';
    language = (localStorage.getItem('language') as Language) || 'es';
    
    // Detectar preferencia de animaciones del sistema si no hay configuración guardada
    const savedAnimations = localStorage.getItem('animationsEnabled');
    if (savedAnimations === null) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      animationsEnabled = !prefersReducedMotion;
    } else {
      animationsEnabled = savedAnimations !== 'false';
    }
  }

  // Suscribirse al store de idioma
  $effect(() => {
    const unsubscribe = currentLanguage.subscribe(value => {
      language = value;
    });
    return unsubscribe;
  });

  function toggleDarkMode() {
    darkMode = !darkMode;
    if (browser) {
      localStorage.setItem('darkMode', String(darkMode));
      document.documentElement.classList.toggle('light-mode', !darkMode);
    }
  }

  function changeLanguage(lang: string) {
    const newLang = lang as Language;
    language = newLang;
    setLanguage(newLang);
  }

  function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    if (browser) {
      localStorage.setItem('animationsEnabled', String(animationsEnabled));
      document.documentElement.classList.toggle('no-animations', !animationsEnabled);
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-overlay" onclick={onClose}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-content" onclick={(e) => e.stopPropagation()}>
    <div class="modal-header">
      <h2>{$t('settings.title')}</h2>
      <button class="close-button" onclick={onClose}>×</button>
    </div>
    
    <div class="modal-body">
      <!-- Modo Oscuro -->
      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-icon">
            {#if darkMode}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            {/if}
          </span>
          <div class="setting-text">
            <h3>{$t('settings.darkMode')}</h3>
            <p>{$t('settings.darkModeDesc')}</p>
          </div>
        </div>
        <button class="toggle-button {darkMode ? 'active' : ''}" onclick={toggleDarkMode} aria-label={$t('settings.darkMode')}>
          <span class="toggle-slider"></span>
        </button>
      </div>

      <!-- Idioma -->
      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M2 12h20" stroke="currentColor" stroke-width="2"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </span>
          <div class="setting-text">
            <h3>{$t('settings.language')}</h3>
            <p>{$t('settings.languageDesc')}</p>
          </div>
        </div>
        <select class="language-select" value={language} onchange={(e) => changeLanguage(e.currentTarget.value)}>
          <option value="es">{$t('lang.es')}</option>
          <option value="en">{$t('lang.en')}</option>
          <option value="fr">{$t('lang.fr')}</option>
          <option value="de">{$t('lang.de')}</option>
          <option value="ru">{$t('lang.ru')}</option>
        </select>
      </div>

      <!-- Animaciones -->
      <div class="setting-item">
        <div class="setting-info">
          <span class="setting-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <div class="setting-text">
            <h3>{$t('settings.animations')}</h3>
            <p>{$t('settings.animationsDesc')}</p>
          </div>
        </div>
        <button class="toggle-button {animationsEnabled ? 'active' : ''}" onclick={toggleAnimations} aria-label={$t('settings.animations')}>
          <span class="toggle-slider"></span>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease-out;
    transition: all 0.3s ease;
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
  }

  .modal-header h2 {
    font-size: 1.8rem;
    color: var(--text-primary);
    margin: 0;
  }

  .close-button {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .close-button:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .setting-item:hover {
    background: var(--bg-primary);
    transform: translateX(4px);
  }

  .setting-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .setting-icon {
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
  }

  .setting-icon svg {
    width: 100%;
    height: 100%;
  }

  .setting-text {
    flex: 1;
  }

  .setting-text h3 {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin: 0 0 0.3rem 0;
  }

  .setting-text p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .setting-text p.small {
    font-size: 0.8rem;
    color: #666;
  }

  .toggle-button {
    position: relative;
    width: 50px;
    height: 26px;
    background: var(--border-color);
    border: none;
    border-radius: 13px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .toggle-button.active {
    background: #4a7c3c;
  }

  .toggle-slider {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }

  .toggle-button.active .toggle-slider {
    transform: translateX(24px);
  }

  .language-select {
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }

  .language-select:hover {
    background: var(--bg-primary);
  }

  @media (max-width: 768px) {
    .modal-content {
      padding: 1.5rem;
    }

    .modal-header h2 {
      font-size: 1.5rem;
    }

    .setting-item {
      padding: 0.8rem;
    }

    .setting-icon {
      width: 1.5rem;
      height: 1.5rem;
      min-width: 1.5rem;
    }

    .setting-text h3 {
      font-size: 1rem;
    }

    .setting-text p {
      font-size: 0.85rem;
    }
  }
</style>
