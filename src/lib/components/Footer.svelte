<style>
  :root {
    /* Footer variables */
    --footer-bg-dark: rgba(128, 128, 128, 0.3);
    --footer-bg-light: rgba(128, 128, 128, 0.15);
    --footer-blur: 10px;
    --footer-border-dark: rgba(255, 255, 255, 0.1);
    --footer-border-light: rgba(0, 0, 0, 0.1);
    --footer-text-dark: rgba(255, 255, 255, 0.7);
    --footer-text-light: rgba(0, 0, 0, 0.6);
    --footer-padding-vertical: 1.5rem;
    --footer-padding-horizontal: 1rem;
    --footer-margin-top: 3rem;
    --footer-font-size: 0.9rem;
    --footer-font-weight: 300;
  }

  /* Footer - BEM */
  .footer {
    width: 100%;
    max-width: 100vw;
    background: var(--footer-bg-dark);
    backdrop-filter: blur(var(--footer-blur));
    padding: var(--footer-padding-vertical) var(--footer-padding-horizontal);
    margin-top: auto;
    border-top: 1px solid var(--footer-border-dark);
    box-sizing: border-box;
  }

  .footer__content {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .footer__text {
    margin: 0;
    color: var(--footer-text-dark);
    font-size: var(--footer-font-size);
    font-weight: var(--footer-font-weight);
  }

  .footer__links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .footer__link {
    display: inline-flex;
    align-items: center;
    color: var(--footer-text-dark);
    text-decoration: none;
    transition: opacity 0.3s ease, transform 0.2s ease;
    opacity: 0.8;
  }

  .footer__link:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  .footer__icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  /* Footer - Light Mode */
  :global(.light-mode) .footer {
    background: var(--footer-bg-light);
    border-top: 1px solid var(--footer-border-light);
  }

  :global(.light-mode) .footer__text,
  :global(.light-mode) .footer__link {
    color: var(--footer-text-light);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .footer__content {
      flex-wrap: wrap;
    }
  }
</style>

<footer class="footer">
  <div class="footer__content">
    <p class="footer__text">Conference League o Interpol © 2026</p>
    <div class="footer__links">
      <a 
        href="https://github.com/ElMasue/" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="footer__link"
        aria-label="GitHub"
      >
        <svg class="footer__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </div>
  </div>
</footer>
