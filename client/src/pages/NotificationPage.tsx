import { useEffect } from "react";
import "./NotificationPage.css";

// Extend the Window interface to include closeMobileMenu
declare global {
  interface Window {
    closeMobileMenu?: () => void;
  }
}

import googlePlayIcon from "../assets/images/google-play-playstore-logo.png";
import internetWebIcon from "../assets/images/internet-web-browser-icon.svg";
import jeelWorkIcon from "../assets/images/jeelWorkLogo.webp";
import jobbersIllustration from "../assets/images/jobbersIllustration.png";
import palestineIcon from "../assets/images/palestine-flag-circular-17840.svg";

function NotificationPage() {
  useEffect(() => {
    // Mobile menu functionality
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    const handleBurgerClick = () => {
      burger?.classList.toggle("active");
      mobileMenu?.classList.toggle("active");
    };

    const closeMobileMenu = () => {
      burger?.classList.remove("active");
      mobileMenu?.classList.remove("active");
    };

    // Close mobile menu when clicking outside
    const handleDocumentClick = (event: MouseEvent) => {
      const targetNode = event.target as Node | null; // cast explicite
      if (
        burger &&
        mobileMenu &&
        targetNode &&
        !burger.contains(targetNode) &&
        !mobileMenu.contains(targetNode)
      ) {
        closeMobileMenu();
      }
    };

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();

      // Vérifier si target est bien un HTMLAnchorElement
      if (!(e.target instanceof HTMLAnchorElement)) return;

      const href = e.target.getAttribute("href");
      if (!href) return;

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    // Add event listeners
    burger?.addEventListener("click", handleBurgerClick);
    document.addEventListener("click", handleDocumentClick);

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    // biome-ignore lint/complexity/noForEach: <explanation>
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    // Make closeMobileMenu available globally for onclick handlers
    window.closeMobileMenu = closeMobileMenu;

    // Cleanup
    return () => {
      burger?.removeEventListener("click", handleBurgerClick);
      document.removeEventListener("click", handleDocumentClick);
      // biome-ignore lint/complexity/noForEach: <explanation>
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
      // biome-ignore lint/performance/noDelete: <explanation>
      delete window.closeMobileMenu;
    };
  }, []);

  return (
    <main>
      <header>
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <img
                src={jeelWorkIcon}
                alt="logo Jeel Work"
                className="logo-img"
              />
              Jeel Work
            </div>
            <ul className="nav-links">
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#fonctionnement">Comment ça marche</a>
              </li>
              <li>
                <a href="#temoignages">Témoignages</a>
              </li>
              <li>
                <a href="#download">Télécharger</a>
              </li>
            </ul>
            <div className="burger" id="burger">
              <div className="burger-line" />
              <div className="burger-line" />
              <div className="burger-line" />
            </div>
          </nav>
        </div>
        <div className="mobile-menu" id="mobileMenu">
          <ul>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#services" onClick={() => window.closeMobileMenu?.()}>
                Services
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a
                href="#fonctionnement"
                onClick={() => window.closeMobileMenu?.()}
              >
                Comment ça marche
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#temoignages" onClick={() => window.closeMobileMenu?.()}>
                Témoignages
              </a>
            </li>
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#download" onClick={() => window.closeMobileMenu?.()}>
                Télécharger
              </a>
            </li>
          </ul>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Des artisans de confiance, partout en Algérie</h1>
            <p>
              Réservez un professionnel près de chez vous, en quelques clics.
            </p>
            <a href="#download" className="btn">
              Essayer gratuitement
            </a>
          </div>
        </div>
      </section>
      <section id="services" className="services">
        <div className="container">
          {/* <h2>Nos Services dans toute l'Algérie</h2> */}
          <h2>Des services fiables, partout en Algérie</h2>
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1.1rem",
              marginBottom: "2rem",
            }}
          >
            Des professionnels qualifiés dans les 48 wilayas
          </p>
          <div className="carousel-wrapper">
            {/* Grid pour desktop */}
            <div className="services-grid">
              <div className="service-card">
                <span className="service-icon">🔌</span>
                <h3>Électricité</h3>
                <p>
                  Dépannage de pannes électriques, installation de prises,
                  interrupteurs et tableaux électriques, pose de compteurs
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🚰</span>
                <h3>Plomberie</h3>
                <p>
                  Réparation de fuites et chasses d'eau, installation de
                  chauffe-eaux, robinets, éviers et débouchage de canalisations
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🎨</span>
                <h3>Peinture</h3>
                <p>
                  Peinture intérieure/extérieure, application d'enduits et
                  sous-couches, réparation de fissures et préparation de
                  surfaces
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🧱</span>
                <h3>Maçonnerie</h3>
                <p>
                  Construction de murs, réparation de fissures, pose de
                  carreaux, faïence et dallage, réalisation de chapes et travaux
                  en béton
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">💡</span>
                <h3>Décoration & Placo</h3>
                <p>
                  Faux plafonds et éclairage LED intégré, moulures et corniches
                  en plâtre, cloisons et habillages décoratifs
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🛠️</span>
                <h3>Bricolage</h3>
                <p>
                  Montage de meubles et étagères, réparation de portes et
                  poignées, installation de tringles et petits travaux
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🚚</span>
                <h3>Déménagement & Transport</h3>
                <p>
                  Déménagements et transport de meubles, livraison d'objets
                  volumineux, chargement/déchargement d'équipements lourds
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🌿</span>
                <h3>Jardinage & Extérieur</h3>
                <p>
                  Taille de palmiers et entretien d'espaces extérieurs, arrosage
                  d'arbres et aménagement de jardins traditionnels
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">❄️</span>
                <h3>Climatisation</h3>
                <p>
                  Installation et maintenance de systèmes de climatisation,
                  réparation et entretien d'unités split et centralisées
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🔧</span>
                <h3>Autres</h3>
                <p>
                  Tous les autres services spécialisés non listés ci-dessus.
                  Décrivez votre besoin et trouvez l'artisan qu'il vous faut
                </p>
              </div>
            </div>

            {/* Carrousel pour mobile */}
            <div className="services-carousel">
              <div className="service-card">
                <span className="service-icon">🔌</span>
                <h3>Électricité</h3>
                <p>
                  Dépannage de pannes électriques, installation de prises,
                  interrupteurs et tableaux électriques, pose de compteurs
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🚰</span>
                <h3>Plomberie</h3>
                <p>
                  Réparation de fuites et chasses d'eau, installation de
                  chauffe-eaux, robinets, éviers et débouchage de canalisations
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🎨</span>
                <h3>Peinture</h3>
                <p>
                  Peinture intérieure/extérieure, application d'enduits et
                  sous-couches, réparation de fissures et préparation de
                  surfaces
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🧱</span>
                <h3>Maçonnerie</h3>
                <p>
                  Construction de murs, réparation de fissures, pose de
                  carreaux, faïence et dallage, réalisation de chapes et travaux
                  en béton
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">💡</span>
                <h3>Décoration & Placo</h3>
                <p>
                  Faux plafonds et éclairage LED intégré, moulures et corniches
                  en plâtre, cloisons et habillages décoratifs
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🛠️</span>
                <h3>Bricolage</h3>
                <p>
                  Montage de meubles et étagères, réparation de portes et
                  poignées, installation de tringles et petits travaux
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🚚</span>
                <h3>Déménagement & Transport</h3>
                <p>
                  Déménagements et transport de meubles, livraison d'objets
                  volumineux, chargement/déchargement d'équipements lourds
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🌿</span>
                <h3>Jardinage & Extérieur</h3>
                <p>
                  Taille de palmiers et entretien d'espaces extérieurs, arrosage
                  d'arbres et aménagement de jardins traditionnels
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">❄️</span>
                <h3>Climatisation</h3>
                <p>
                  Installation et maintenance de systèmes de climatisation,
                  réparation et entretien d'unités split et centralisées
                </p>
              </div>
              <div className="service-card">
                <span className="service-icon">🔧</span>
                <h3>Autres</h3>
                <p>
                  Tous les autres services spécialisés non listés ci-dessus.
                  Décrivez votre besoin et trouvez l'artisan qu'il vous faut
                </p>
              </div>
            </div>

            <div className="carousel-dots" />
          </div>
        </div>
      </section>
      <section id="fonctionnement" className="how-it-works">
        <div className="container">
          <h2>Comment ça marche</h2>
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1.1rem",
              marginBottom: "2rem",
            }}
          >
            Facile, rapide et accessible à tous
          </p>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Décrivez votre besoin</h3>
              <p>
                Ajoutez des détails pour que les jobbers comprennent clairement
                votre demande (type de service, délais, contexte, etc.)
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Recevez des offres</h3>
              <p>
                Comparez les propositions d'artisans près de chez vous et
                choisissez celui qui vous convient
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Service réalisé</h3>
              <p>
                L'artisan effectue la prestation, le paiement se fait
                directement entre vous
              </p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Laissez un avis</h3>
              <p>
                Évaluez la prestation de l'artisan pour aider la communauté à
                faire le bon choix
              </p>
            </div>
          </div>
          {/* Carrousel pour mobile */}

          {/* <div className="steps-carousel">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Décrivez votre besoin</h3>
              <p>
                Ajoutez des détails pour que les jobbers comprennent clairement
                votre demande (type de service, délais, contexte, etc.)
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Recevez des offres</h3>
              <p>
                Comparez les propositions d'artisans près de chez vous et
                choisissez celui qui vous convient
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Service réalisé</h3>
              <p>
                L'artisan effectue la prestation, le paiement se fait
                directement entre vous
              </p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Laissez un avis</h3>
              <p>
                Évaluez la prestation de l'artisan pour aider la communauté à
                faire le bon choix
              </p>
            </div>
          </div>
          <div className="carousel-dots" /> */}
        </div>
      </section>
      <section id="download" className="app-download">
        <div className="app-content">
          <div className="container">
            <h2>Téléchargez Jeel Work Algérie</h2>
            <p>
              Accédez à tous nos services partout en Algérie depuis votre
              smartphone
            </p>

            <div className="download-options">
              <a
                href="https://play.google.com/store/apps/details?id=com.jeeltech.jeelwork"
                className="download-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={googlePlayIcon}
                  alt="Google Play Store"
                  className="play-store-badge"
                />
                Télécharger l'App
              </a>

              <span className="download-separator">ou</span>

              <a
                href="https://app.jeelwork.com/"
                className="download-btn web-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={internetWebIcon}
                  alt="Web Browser"
                  className="play-store-badge"
                />
                Continuer sur le site
              </a>
            </div>

            <p className="app-info">
              Gratuit et conçu pour fonctionner efficacement partout en Algérie
            </p>
          </div>
        </div>
      </section>
      <section id="temoignages" className="testimonials">
        <div className="container">
          <h2>Ils nous font confiance à travers l'Algérie</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>
                "J'avais une panne d'électricité un vendredi soir. Grâce à Jeel
                Work, j'ai pu contacter un artisan dispo rapidement. Travail
                propre, prix raisonnable."
              </p>
              <div className="testimonial-author">Yahia BOUKERMOUCHE</div>
              <div className="testimonial-role">
                Particulier - Ghardaïa, Ghardaïa
              </div>
            </div>
            <div className="testimonial-card">
              <p>
                "Je devais réparer une fuite d'eau dans ma cuisine. J'ai trouvé
                un plombier sérieux via Jeel Work. Il est venu le jour même, ça
                m'a bien arrangé."
              </p>
              <div className="testimonial-author">Aissa KERROUCHI</div>
              <div className="testimonial-role">
                Propriétaire - Berriane, Ghardaïa
              </div>
            </div>
            <div className="testimonial-card">
              <p>
                "J'avais besoin de quelqu'un pour tailler des palmiers et des
                arbres autour de ma maison. En quelques clics sur Jeel Work,
                j'ai trouvé un artisan équipé et sérieux. Très bon service."
              </p>
              <div className="testimonial-author">Belhadj BEN CHIKH</div>
              <div className="testimonial-role">
                Entrepreneur - Guerrara, Ghardaïa
              </div>
            </div>
          </div>
          {/* Carrousel pour mobile */}
          <div className="testimonials-carousel">
            <div className="testimonial-card">
              <p>
                "J'avais une panne d'électricité un vendredi soir. Grâce à Jeel
                Work, j'ai pu contacter un artisan dispo rapidement. Travail
                propre, prix raisonnable."
              </p>
              <div className="testimonial-author">Yahia BOUKERMOUCHE</div>
              <div className="testimonial-role">
                Particulier - Ghardaïa, Ghardaïa
              </div>
            </div>
            <div className="testimonial-card">
              <p>
                "Je devais réparer une fuite d'eau dans ma cuisine. J'ai trouvé
                un plombier sérieux via Jeel Work. Il est venu le jour même, ça
                m'a bien arrangé."
              </p>
              <div className="testimonial-author">Aissa KERROUCHI</div>
              <div className="testimonial-role">
                Propriétaire - Berriane, Ghardaïa
              </div>
            </div>
            <div className="testimonial-card">
              <p>
                "J'avais besoin de quelqu'un pour tailler des palmiers et des
                arbres autour de ma maison. En quelques clics sur Jeel Work,
                j'ai trouvé un artisan équipé et sérieux. Très bon service."
              </p>
              <div className="testimonial-author">Belhadj BEN CHIKH</div>
              <div className="testimonial-role">
                Entrepreneur - Guerrara, Ghardaïa
              </div>
            </div>
          </div>
          <div className="carousel-dots" />
        </div>
      </section>

      {/* <h2 id="footer-slogan">
        Facilitons ensemble l'accès à des artisans de confiance, où que vous
        soyez
      </h2> */}

      <section className="cta-section">
        <div className="cta-content">
          <h2>Réservez un artisan de confiance en quelques clics</h2>
          <p>
            Grâce à Jeel Work, trouvez facilement un professionnel près de chez
            vous, réservez en quelques clics et payez en toute sécurité après la
            prestation. Partout en Algérie.
          </p>
        </div>
        <div className="cta-image">
          <img src={jobbersIllustration} alt="Professionnel de confiance" />
        </div>
      </section>

      <footer id="footer">
        <div className="container">
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#fonctionnement">Comment ça marche</a>
            <a href="#temoignages">Témoignages</a>
            <a href="#download">Télécharger</a>
            <a href="https://google.com/">Conditions d'utilisation</a>
            <a href="https://google.com/">Politique de confidentialité</a>
          </div>
          <div className="footer-bottom">
            <div className="logo logo-footer">
              {/* <span>🍉</span> */}
              <img src={palestineIcon} alt="Palestine flag" />
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 512"
              >
                {/* <path
                  fill="#4D4D4D"
                  fillRule="nonzero"
                  d="M256-.001c70.684 0 134.69 28.664 181.013 74.988C483.337 121.31 512.001 185.316 512.001 256c0 70.684-28.664 134.69-74.988 181.013C390.69 483.337 326.684 512.001 256 512.001c-70.677 0-134.69-28.664-181.013-74.988C28.663 390.69-.001 326.676-.001 256c0-70.684 28.664-134.69 74.988-181.013C121.31 28.663 185.316-.001 256-.001z"
                /> */}
                <path
                  fill="#fff"
                  fillRule="nonzero"
                  d="M256.001 19.596c65.278 0 124.383 26.466 167.163 69.243 42.776 42.779 69.243 101.884 69.243 167.162s-26.467 124.383-69.246 167.16c-42.777 42.779-101.882 69.246-167.16 69.246-65.278 0-124.383-26.467-167.162-69.243-42.777-42.78-69.243-101.885-69.243-167.163S46.062 131.618 88.839 88.839c42.779-42.777 101.884-69.243 167.162-69.243z"
                />
                <path
                  fill="#063"
                  fillRule="nonzero"
                  d="M255.939 39.594v432.815c-119.491-.033-216.345-96.911-216.345-216.408 0-119.5 96.854-216.375 216.345-216.407z"
                />
                <path
                  fill="#D21034"
                  fillRule="nonzero"
                  d="M351.787 196.335c-19.747-34.233-56.313-55.338-95.848-55.338-61.115 0-110.676 49.561-110.676 110.676 0 61.113 49.561 110.677 110.676 110.677 39.535 0 76.086-21.094 95.854-55.333a88.607 88.607 0 01-69.122 33.197c-48.893 0-88.541-39.65-88.541-88.541 0-48.893 39.648-88.541 88.541-88.541a88.558 88.558 0 0169.116 33.206v-.003zm4.259 55.338l-100.107-32.526 61.871 85.154V199.042L255.939 284.2l100.107-32.527z"
                />
              </svg>
            </div>
            <p>&copy; 2025 Jeel Work Algérie. Tous droits réservés.</p>
            <p>
              Jeel Work : pour une nouvelle génération de services en Algérie.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default NotificationPage;
