<script lang="ts">
  import { t } from '$lib/stores/i18n';

  type PersonType = 'conference' | 'interpol';

  interface Details {
    position?: string;
    team?: string;
    crime?: string;
  }

  interface Props {
    name: string;
    type: PersonType;
    isCorrect: boolean;
    details: Details;
  }

  let { name, type, isCorrect, details }: Props = $props();

  const resultTitle = $derived(isCorrect ? $t('result.correct') : $t('result.wrong'));
  const resultMessage = $derived(type === 'conference' ? $t('result.wasPlayer') : $t('result.wasCriminal'));
  const teamLabel = $derived($t('result.team'));
  const crimeLabel = $derived($t('result.crime'));
</script>

<div class="result-card">
  <div class="result-message {isCorrect ? 'correct' : 'incorrect'}">
    {resultTitle}
  </div>
  <div class="result-info">
    <h2 class="result-name">{name}</h2>
    <p class="result-type">{resultMessage}</p>
    {#if type === 'conference'}
      <div class="result-details">
        <p class="result-detail"><strong>{teamLabel}:</strong> {details.team}</p>
      </div>
    {:else}
      <div class="result-details">
        <p class="result-detail"><strong>{crimeLabel}:</strong> {details.crime}</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .result-card {
    --result-card-bg: rgba(255, 255, 255, 0.05);
    --result-card-border: rgba(255, 255, 255, 0.1);
    --result-card-blur: 20px;
    --result-card-radius: 24px;
    --result-card-padding: 2rem;
    --result-card-margin-top: 2rem;
    --result-card-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
    --result-msg-padding: 1.2rem;
    --result-msg-radius: 12px;
    --result-msg-font-size: 1.3rem;
    --result-name-font-size: 2rem;
    --result-type-font-size: 1.1rem;
    --result-detail-font-size: 1.1rem;
    --result-correct-bg: #2f7c31;
    --result-incorrect-bg: #c92a2a;
    
    background: var(--result-card-bg);
    backdrop-filter: blur(var(--result-card-blur));
    border: 1px solid var(--result-card-border);
    border-radius: var(--result-card-radius);
    padding: var(--result-card-padding);
    max-width: 600px;
    margin: var(--result-card-margin-top) auto 0;
    box-shadow: var(--result-card-shadow);
    animation: slideIn 0.4s ease-out;
    transition: all 0.3s ease;
  }

  @media (min-width: 1024px) and (max-width: 1920px) {
    .result-card {
      --result-card-padding: 1.8rem;
      --result-card-margin-top: 0;
      --result-msg-font-size: 1.1rem;
      --result-msg-padding: 1rem;
      --result-name-font-size: 1.6rem;
      --result-type-font-size: 1rem;
      --result-detail-font-size: 0.9rem;
    }

    .result-message {
      margin-bottom: 1.2rem;
    }

    .result-name {
      margin-bottom: 0.8rem;
    }

    .result-type {
      margin-bottom: 1rem;
    }

    .result-details {
      padding: 1rem;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .result-message {
    padding: var(--result-msg-padding);
    border-radius: var(--result-msg-radius);
    font-size: var(--result-msg-font-size);
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
  }

  .result-message.correct {
    background-color: var(--result-correct-bg);
    color: #ffffff;
  }

  .result-message.incorrect {
    background-color: var(--result-incorrect-bg);
    color: #ffffff;
  }

  .result-info {
    text-align: center;
  }

  .result-name {
    font-size: var(--result-name-font-size);
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    text-align: center;
  }

  .result-type {
    font-size: var(--result-type-font-size);
    color: var(--text-secondary);
    margin: 0.5rem 0 1rem 0;
    text-align: center;
    font-weight: 600;
  }

  .result-details {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid var(--border-color);
  }

  .result-detail {
    font-size: var(--result-detail-font-size);
    color: var(--text-secondary);
    margin: 0.5rem 0;
    text-align: center;
    font-weight: 500;
  }

  .result-detail strong {
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .result-card {
      --result-card-padding: 1.5rem;
      --result-card-margin-top: 1.5rem;
      --result-name-font-size: 1.6rem;
      --result-type-font-size: 1rem;
      --result-detail-font-size: 1rem;
      --result-msg-font-size: 1.1rem;
      --result-msg-padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .result-card {
      --result-card-padding: 1rem;
      --result-card-margin-top: 1rem;
      --result-name-font-size: 1.4rem;
      --result-type-font-size: 0.9rem;
      --result-detail-font-size: 0.9rem;
      --result-msg-font-size: 0.95rem;
      --result-msg-padding: 0.9rem;
    }
  }
</style>
