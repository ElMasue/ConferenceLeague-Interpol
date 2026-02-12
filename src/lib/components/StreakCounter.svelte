<script lang="ts">
  import { t } from '$lib/stores/i18n';

  interface Props {
    streak: number;
    maxStreak: number;
  }

  let { streak, maxStreak }: Props = $props();
</script>

<div class="streak-counter">
  <div class="streak-item current">
    <div class="streak-label">{$t('streak.current')}</div>
    <div class="streak-number">{streak}</div>
    <div class="streak-fire">
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C9 5 7 8 7 12C7 15.31 9.69 18 13 18C16.31 18 19 15.31 19 12C19 8 17 5 14 2C13.5 4 13 6 11 8C11 6 11 4 12 2Z" />
      </svg>
    </div>
  </div>
  <div class="streak-divider"></div>
  <div class="streak-item max">
    <div class="streak-label">{$t('streak.record')}</div>
    <div class="streak-number">{maxStreak}</div>
    <div class="streak-trophy">
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 5V9C7 10 7.5 10.5 8 11H8.5V13H9V15H10V17H14V15H15V13H15.5V11H16C16.5 10.5 17 10 17 9V5H7Z" />
        <rect x="9" y="17" width="6" height="2" />
        <rect x="8" y="19" width="8" height="1" />
        <path d="M5 5H7V8C7 9 6 9.5 5 9.5V5Z" />
        <path d="M17 5H19V9.5C18 9.5 17 9 17 8V5Z" />
      </svg>
    </div>
  </div>
</div>

<style>
  .streak-counter {
    --streak-gap: 2rem;
    --streak-padding-v: 1.5rem;
    --streak-padding-h: 2.5rem;
    --streak-bg: rgba(255, 255, 255, 0.05);
    --streak-border: rgba(255, 255, 255, 0.1);
    --streak-blur: 20px;
    --streak-radius: 20px;
    --streak-margin-bottom: 2rem;
    --streak-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
    --streak-item-gap: 1rem;
    --streak-label-size: 1rem;
    --streak-number-size: 2.5rem;
    --streak-icon-size: 2rem;
    --streak-divider-height: 60px;
    --streak-fire-color: #ff6b35;
    --streak-trophy-color: #ffd700;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--streak-gap);
    padding: var(--streak-padding-v) var(--streak-padding-h);
    background: var(--streak-bg);
    backdrop-filter: blur(var(--streak-blur));
    border: 1px solid var(--streak-border);
    border-radius: var(--streak-radius);
    margin-bottom: var(--streak-margin-bottom);
    box-shadow: var(--streak-shadow);
    transition: all 0.3s ease;
  }

  .streak-item {
    display: flex;
    align-items: center;
    gap: var(--streak-item-gap);
  }

  .streak-divider {
    width: 2px;
    height: var(--streak-divider-height);
    background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 2px;
  }

  .streak-label {
    font-size: var(--streak-label-size);
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .streak-number {
    font-size: var(--streak-number-size);
    font-weight: 900;
    color: var(--text-primary);
    min-width: 60px;
    text-align: center;
  }

  .streak-fire {
    width: var(--streak-icon-size);
    height: var(--streak-icon-size);
    color: var(--streak-fire-color);
  }

  .streak-fire svg {
    width: 100%;
    height: 100%;
    animation: fireFlicker 0.5s ease-in-out infinite alternate;
  }

  .streak-trophy {
    width: var(--streak-icon-size);
    height: var(--streak-icon-size);
    color: var(--streak-trophy-color);
  }

  .streak-trophy svg {
    width: 100%;
    height: 100%;
    animation: trophyShine 2s ease-in-out infinite;
  }

  @keyframes fireFlicker {
    from {
      transform: scale(1) rotate(-5deg);
      filter: brightness(1);
    }
    to {
      transform: scale(1.1) rotate(5deg);
      filter: brightness(1.3);
    }
  }

  @keyframes trophyShine {
    0%, 100% {
      transform: rotate(0deg);
      filter: brightness(1);
    }
    50% {
      transform: rotate(-10deg);
      filter: brightness(1.5);
    }
  }

  @media (max-width: 768px) {
    .streak-counter {
      --streak-padding-v: 0.8rem;
      --streak-padding-h: 1.5rem;
      --streak-gap: 1.5rem;
      --streak-margin-bottom: 1.5rem;
      --streak-item-gap: 0.8rem;
      --streak-divider-height: 50px;
      --streak-label-size: 0.9rem;
      --streak-number-size: 2rem;
      --streak-icon-size: 1.5rem;
    }

    .streak-number {
      min-width: 50px;
    }
  }

  @media (max-width: 480px) {
    .streak-counter {
      --streak-padding-v: 0.7rem;
      --streak-padding-h: 1rem;
      --streak-gap: 1rem;
      --streak-margin-bottom: 1rem;
      --streak-item-gap: 0.3rem;
      --streak-divider-height: 40px;
      --streak-label-size: 0.7rem;
      --streak-number-size: 1.5rem;
      --streak-icon-size: 1.2rem;
    }

    .streak-item {
      flex-direction: column;
      text-align: center;
    }

    .streak-number {
      min-width: 40px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1920px) {
    .streak-counter {
      --streak-padding-v: 1rem;
      --streak-padding-h: 1.5rem;
      --streak-gap: 1.5rem;
      --streak-margin-bottom: 1.2rem;
      --streak-label-size: 0.85rem;
      --streak-number-size: 2rem;
      --streak-divider-height: 50px;
      --streak-icon-size: 1.5rem;
    }

    .streak-number {
      min-width: 50px;
    }
  }
</style>
