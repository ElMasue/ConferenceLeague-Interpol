<script lang="ts">
  import { t } from '$lib/stores/i18n';

  type Answer = 'conference' | 'interpol';

  interface Props {
    imageUrl: string;
    onAnswer: (answer: Answer) => void;
    showResult: boolean;
    onNext: () => void;
  }

  let { imageUrl, onAnswer, showResult, onNext }: Props = $props();
  
  let selectedAnswer: Answer | null = $state(null);

  function handleAnswer(answer: Answer) {
    if (selectedAnswer !== null) return; // Prevenir cambios después de seleccionar
    selectedAnswer = answer;
    onAnswer(answer);
  }
</script>

<div class="game-card">
  <div class="image-container">
    <img src={imageUrl} alt={$t('game.imageAlt')} class="person-image" />
  </div>
  <div class="buttons-container">
    {#if !showResult}
      <button 
        class="game-button conference-button {selectedAnswer === 'conference' ? 'selected' : ''}"
        onclick={() => handleAnswer('conference')}
        disabled={selectedAnswer !== null}
      >
        {$t('game.conferenceButton')}
      </button>
      <button 
        class="game-button interpol-button {selectedAnswer === 'interpol' ? 'selected' : ''}"
        onclick={() => handleAnswer('interpol')}
        disabled={selectedAnswer !== null}
      >
        {$t('game.interpolButton')}
      </button>
    {:else}
      <button 
        class="next-button"
        onclick={onNext}
      >
        {$t('game.nextButton')}
      </button>
    {/if}
  </div>
</div>

<style>
  .game-card {
    --card-bg-dark: rgba(42, 42, 42, 0.6);
    --card-bg-light: rgba(255, 255, 255, 0.85);
    --card-border-dark: rgba(255, 215, 0, 0.15);
    --card-border-light: rgba(167, 139, 250, 0.12);
    --card-shadow-dark: 0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 215, 0, 0.08);
    --card-shadow-light: 0 20px 60px rgba(167, 139, 250, 0.1), 0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
    --card-padding: 2.5rem;
    --card-border-radius: 24px;
    --card-blur: 30px;
    --image-max-width: 350px;
    --image-padding: 1.5rem;
    --image-margin-bottom: 2rem;
    --button-gap: 1.5rem;
    --button-padding: 1.2rem 2rem;
    --button-font-size: 1.2rem;
    
    background: var(--card-bg-dark);
    backdrop-filter: blur(var(--card-blur));
    border: 1px solid var(--card-border-dark);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    max-width: 600px;
    margin: 0 auto;
    box-shadow: var(--card-shadow-dark);
    transition: all 0.3s ease;
  }

  :global(.light-mode) .game-card {
    background: var(--card-bg-light);
    border: 1px solid var(--card-border-light);
    box-shadow: var(--card-shadow-light);
  }

  .image-container {
    --image-bg-gradient: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    --image-border-radius: 16px;
    --image-border-color: rgba(255, 255, 255, 0.5);
    --image-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 3px rgba(255, 255, 255, 0.5);
    
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: var(--image-margin-bottom);
    background: var(--image-bg-gradient);
    border-radius: var(--image-border-radius);
    padding: var(--image-padding);
    width: 100%;
    max-width: var(--image-max-width);
    aspect-ratio: 1 / 1;
    margin-left: auto;
    margin-right: auto;
    box-shadow: var(--image-shadow);
    border: 2px solid var(--image-border-color);
  }

  .person-image {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: contain;
    object-position: center;
  }

  @media (min-width: 1024px) and (max-width: 1920px) {
    .game-card {
      --card-padding: 1.8rem;
      --image-max-width: 300px;
      --image-padding: 1.2rem;
      --image-margin-bottom: 1.5rem;
      --button-gap: 1rem;
      --button-padding: 1rem 1.5rem;
      --button-font-size: 1rem;
    }
  }

  .buttons-container {
    display: flex;
    gap: var(--button-gap);
    justify-content: center;
  }

  .buttons-container .next-button {
    --next-btn-bg: linear-gradient(135deg, #4a7c9c 0%, #5a8cac 100%);
    --next-btn-bg-hover: linear-gradient(135deg, #5a8cac 0%, #6a9cbc 100%);
    --next-btn-shadow: 0 4px 15px rgba(74, 124, 156, 0.4);
    --next-btn-shadow-hover: 0 8px 25px rgba(74, 124, 156, 0.5);
    
    flex: 1;
    max-width: 100%;
    margin: 0;
    padding: var(--button-padding);
    font-size: var(--button-font-size);
    font-weight: 700;
    background: var(--next-btn-bg);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--next-btn-shadow);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .buttons-container .next-button:hover {
    background: var(--next-btn-bg-hover);
    transform: translateY(-3px);
    box-shadow: var(--next-btn-shadow-hover);
  }

  .buttons-container .next-button:active {
    transform: translateY(0);
  }

  .game-button {
    --btn-border-radius: 12px;
    --btn-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    
    flex: 1;
    padding: var(--button-padding);
    font-size: var(--button-font-size);
    font-weight: 700;
    border: none;
    border-radius: var(--btn-border-radius);
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: var(--btn-shadow);
  }

  .conference-button {
    --conference-bg: linear-gradient(135deg, #4a7c3c 0%, #5a9246 100%);
    --conference-bg-hover: linear-gradient(135deg, #5a9246 0%, #6aa256 100%);
    --conference-shadow: 0 4px 15px rgba(74, 124, 60, 0.4);
    --conference-shadow-hover: 0 8px 25px rgba(74, 124, 60, 0.5);
    
    background: var(--conference-bg);
    box-shadow: var(--conference-shadow);
  }

  .conference-button:hover {
    background: var(--conference-bg-hover);
    transform: translateY(-3px);
    box-shadow: var(--conference-shadow-hover);
  }

  .interpol-button {
    --interpol-bg: linear-gradient(135deg, #c92a2a 0%, #e03131 100%);
    --interpol-bg-hover: linear-gradient(135deg, #e03131 0%, #f03e3e 100%);
    --interpol-shadow: 0 4px 15px rgba(201, 42, 42, 0.4);
    --interpol-shadow-hover: 0 8px 25px rgba(201, 42, 42, 0.5);
    
    background: var(--interpol-bg);
    box-shadow: var(--interpol-shadow);
  }

  .interpol-button:hover {
    background: var(--interpol-bg-hover);
    transform: translateY(-3px);
    box-shadow: var(--interpol-shadow-hover);
  }

  .game-button:active {
    transform: translateY(0);
  }

  .game-button.selected {
    transform: scale(0.95);
    opacity: 0.8;
  }

  .game-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .game-button:disabled:hover {
    transform: none;
    box-shadow: var(--btn-shadow);
  }

  @media (max-width: 768px) {
    .game-card {
      --card-padding: 1.5rem;
      --card-border-radius: 12px;
      --image-max-width: 280px;
      --image-margin-bottom: 1.5rem;
      --button-gap: 1rem;
      --button-padding: 1rem 1.5rem;
      --button-font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .game-card {
      --card-padding: 1rem;
      --image-max-width: 240px;
      --image-margin-bottom: 1rem;
      --image-padding: 0.5rem;
      --button-gap: 0.8rem;
      --button-padding: 0.9rem 1rem;
      --button-font-size: 0.9rem;
    }

    .buttons-container {
      flex-direction: column;
    }
  }
</style>
