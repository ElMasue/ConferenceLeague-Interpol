<script lang="ts">
  import { t } from '$lib/stores/i18n';

  interface Props {
    streak: number;
    onRestart: () => void;
  }

  let { streak, onRestart }: Props = $props();

  const shareText = $derived($t('completion.shareText', { streak: String(streak) }) + '\n' + $t('completion.shareQuestion'));

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: $t('app.title') + ' - ' + $t('completion.title'),
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Copiar al portapapeles como fallback
      navigator.clipboard.writeText(shareText + '\n' + window.location.href);
      alert($t('share.copied'));
    }
  }

  function handleTwitterShare() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(twitterUrl, '_blank');
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-overlay" onclick={(e) => e.stopPropagation()}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-content" onclick={(e) => e.stopPropagation()}>
    <div class="modal-header">
      <h2>{$t('completion.title')}</h2>
    </div>
    
    <div class="modal-body">
      <div class="streak-display">
        <div class="streak-big-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9C6 7 7 6 9 6H15C17 6 18 7 18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M8 6V4H16V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 9V14H15V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 14V17H13V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M8 17H16V19H8V17Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="streak-text">{$t('completion.allCompleted')}</div>
      </div>
      
      <p class="modal-message">
        {$t('completion.message', { streak: String(streak) })}
      </p>
      
      <div class="share-buttons">
        <button class="share-button primary" onclick={handleShare}>
          {$t('completion.shareButton')}
        </button>
        <button class="share-button twitter" onclick={handleTwitterShare}>
          {$t('completion.twitterButton')}
        </button>
      </div>
    </div>
    
    <button class="continue-button" onclick={onRestart}>
      {$t('completion.restartButton')}
    </button>
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
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease-out;
    transition: all 0.3s ease;
  }

  :global(.light-mode) .modal-content {
    background: rgba(255, 255, 255, 0.95);
  }

  :global(:not(.light-mode)) .modal-content {
    background: rgba(30, 30, 30, 0.95);
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
  }

  .modal-header h2 {
    font-size: 1.8rem;
    color: var(--text-primary);
    margin: 0;
  }

  .modal-body {
    margin-bottom: 1.5rem;
  }

  .streak-display {
    text-align: center;
    margin-bottom: 1.5rem;
    padding: 2.5rem;
    background: linear-gradient(135deg, #4a7c3c 0%, #5a9246 50%, #6aa256 100%);
    border-radius: 20px;
    box-shadow: 
      0 8px 32px rgba(74, 124, 60, 0.4),
      inset 0 1px 3px rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
  }

  .streak-display::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: shine 3s ease-in-out infinite;
  }

  @keyframes shine {
    0%, 100% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(0%, 0%);
    }
  }

  .streak-big-icon {
    width: 5rem;
    height: 5rem;
    margin: 0 auto 1rem;
    color: #ffffff;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  }

  .streak-big-icon svg {
    width: 100%;
    height: 100%;
  }

  .streak-text {
    font-size: 1.2rem;
    color: #ffffff;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .modal-message {
    text-align: center;
    color: var(--text-secondary);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .share-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .share-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .share-button.primary {
    background: linear-gradient(135deg, #4a7c9c 0%, #5a8cac 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(74, 124, 156, 0.3);
  }

  .share-button.primary:hover {
    background: linear-gradient(135deg, #5a8cac 0%, #6a9cbc 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(74, 124, 156, 0.4);
  }

  .share-button.twitter {
    background: linear-gradient(135deg, #1DA1F2 0%, #1a8cd8 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(29, 161, 242, 0.3);
  }

  .share-button.twitter:hover {
    background: linear-gradient(135deg, #1a8cd8 0%, #1780c9 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(29, 161, 242, 0.4);
  }

  .continue-button {
    width: 100%;
    padding: 1.2rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    background: linear-gradient(135deg, #6a9cbc 0%, #7aaccc 100%);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(106, 156, 188, 0.3);
  }

  .continue-button:hover {
    background: linear-gradient(135deg, #7aaccc 0%, #8abddc 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(106, 156, 188, 0.4);
  }

  @media (max-width: 768px) {
    .modal-content {
      padding: 1.5rem;
    }

    .modal-header h2 {
      font-size: 1.5rem;
    }

    .streak-big-icon {
      width: 4rem;
      height: 4rem;
    }

    .streak-text {
      font-size: 1rem;
    }

    .modal-message {
      font-size: 1rem;
    }

    .share-button {
      padding: 0.9rem 1.5rem;
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .modal-content {
      padding: 1rem;
    }

    .modal-header h2 {
      font-size: 1.3rem;
    }

    .streak-display {
      padding: 1.5rem;
    }

    .streak-big-number {
      font-size: 2.5rem;
    }

    .streak-text {
      font-size: 0.9rem;
    }

    .modal-message {
      font-size: 0.9rem;
    }

    .share-button {
      padding: 0.8rem 1rem;
      font-size: 0.9rem;
    }
  }
</style>
