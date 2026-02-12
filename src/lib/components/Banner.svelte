<script lang="ts">
  import { t } from '$lib/stores/i18n';
  import bannerImage from '$lib/assets/banner/banner-image.png';
</script>

<div class="banner-container">
  <img 
    src={bannerImage} 
    alt={$t('app.title')} 
    class="banner-image"
  />
  <div class="banner-overlay">
    <h1 class="banner-title">{$t('app.title')}</h1>
    <p class="banner-subtitle">{$t('app.subtitle')}</p>
  </div>
</div>

<style>
  .banner-container {
    --banner-margin-bottom: 2rem;
    --banner-image-max-height: 250px;
    --banner-overlay-gradient-dark: linear-gradient(
      135deg, 
      rgba(102, 126, 234, 0.3) 0%, 
      rgba(118, 75, 162, 0.3) 100%
    );
    --banner-overlay-gradient-light: linear-gradient(
      135deg, 
      rgba(167, 139, 250, 0.18) 0%, 
      rgba(192, 132, 252, 0.15) 50%,
      rgba(255, 255, 255, 0.25) 100%
    );
    --banner-title-size: 3rem;
    --banner-subtitle-size: 1.3rem;
    --banner-title-shadow-dark: 3px 3px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(102, 126, 234, 0.5);
    --banner-title-shadow-light: 2px 2px 6px rgba(167, 139, 250, 0.35), -1px -1px 3px rgba(255, 255, 255, 1), 0 0 15px rgba(192, 132, 252, 0.25);
    --banner-subtitle-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
    
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 0 var(--banner-margin-bottom) 0;
    overflow: hidden;
    box-sizing: border-box;
  }

  .banner-image {
    width: 100%;
    height: auto;
    max-height: var(--banner-image-max-height);
    display: block;
    object-fit: cover;
    object-position: center;
  }

  @media (min-width: 1024px) and (max-width: 1920px) {
    .banner-container {
      --banner-image-max-height: 150px;
      --banner-margin-bottom: 1rem;
    }
  }

  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--banner-overlay-gradient-dark);
  }

  :global(.light-mode) .banner-overlay {
    background: var(--banner-overlay-gradient-light);
  }

  .banner-title {
    font-size: var(--banner-title-size);
    font-weight: 900;
    color: white;
    margin: 0;
    padding: 0 1rem;
    text-shadow: var(--banner-title-shadow-dark);
    letter-spacing: 0.5px;
    text-align: center;
    line-height: 1.2;
  }

  :global(.light-mode) .banner-title {
    text-shadow: var(--banner-title-shadow-light);
  }

  .banner-subtitle {
    font-size: var(--banner-subtitle-size);
    font-weight: 400;
    color: white;
    margin: 0.3rem 0 0 0;
    padding: 0 1rem;
    text-shadow: var(--banner-subtitle-shadow);
    text-align: center;
  }

  @media (max-width: 768px) {
    .banner-container {
      --banner-margin-bottom: 1rem;
      --banner-image-max-height: 180px;
      --banner-title-size: 1.8rem;
      --banner-subtitle-size: 0.9rem;
    }

    .banner-title {
      padding: 0 0.5rem;
    }

    .banner-subtitle {
      padding: 0 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .banner-container {
      --banner-image-max-height: 140px;
      --banner-title-size: 1rem;
      --banner-subtitle-size: 0.65rem;
    }

    .banner-title {
      padding: 0 0.5rem;
      letter-spacing: 0.2px;
    }

    .banner-subtitle {
      padding: 0 0.5rem;
    }
  }
</style>
