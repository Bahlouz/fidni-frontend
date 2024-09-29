import React from "react";
import logo from "../Assets/logo.svg";
import unesco from "../Assets/unesco.png";
import unprpd from "../Assets/unprpd.svg";
import ibsarLogo from "../Assets/ibsar.svg";
import { Container,Row,Col} from "react-bootstrap";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClickDescription = () => {
    const isHomePage = window.location.pathname === "/"; // Check if the current page is the home page
  
    if (isHomePage) {
      // Scroll to the section if already on the home page
      scrollToDescription();
    } else {
      // Redirect to the home page with a hash indicating the section to scroll to
      window.location.href = "/#description";
    }
  };
  window.addEventListener("load", () => {
    if (window.location.hash === "#description") {
      // Give the page a moment to load the element, then scroll
      setTimeout(() => {
        scrollToDescription();
      }, 100); // Adjust the delay as needed if the page content loads asynchronously
    }
  });
  
  const scrollToDescription = () => {
    const descriptionSection = document.getElementById("description");
    const navbarHeight = document.querySelector("nav").offsetHeight;
  
    if (descriptionSection) {
      const offset = descriptionSection.offsetTop - navbarHeight - 70; // Subtract navbar height and add 70px margin
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };
  
  

  return (
      <footer className="footer" id="footer">
        <svg
          className="footer-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="footer-wave-path"
            aria-hidden="true"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
          ></path>
        </svg>
        <Container className="footer-container">
      <Row className="text-center">
        {/* Empty top-left cell */}
        <Col></Col>
        <Col className="d-flex justify-content-center align-items-center">
          <img src={logo} alt="Logo Fidni" className="footer-lg" />
        </Col>
        <Col></Col>
      </Row>
      <Row className="text-center">
        {/* Empty cell */}
        <Col></Col>
        <Col className="d-flex justify-content-center align-items-center">
          <p>Pour une communauté informée et inclusive.</p>
        </Col>
        <Col></Col>
      </Row>
      <Row className="text-center">
        {/* Empty cell */}
        <Col></Col>
        <Col className="d-flex justify-content-center align-items-center">
          <p>Contact@fidni.tn | +216 29 180 780</p>
        </Col>
        <Col></Col>
      </Row>
      <Row className="text-center">
        {/* Empty cell */}
        <Col></Col>
        <Col className="d-flex justify-content-center align-items-center">
          <p>
            Cette plateforme est élaborée dans le cadre du projet « Pour un
            meilleur accès des personnes handicapées aux services et aux droits
            en Tunisie »
          </p>
        </Col>
        <Col></Col>
      </Row>
      <Row className="text-center">
        <Col className="d-flex justify-content-center align-items-center">
          <img src={unesco} alt="Logo UNESCO" className="footer-partner" />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="partners-logos">
            
            <img src={ibsarLogo} alt="Logo IBSAR" className="footer-partner" />
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
        <img src={unprpd} alt="Logo UNPRPD" className="footer-partner" />
        </Col>
      </Row>
    </Container>
        <div className="footer-content">
          <div className="footer-content-column">
            <div className="footer-logo">
              <a className="footer-logo-link" href="/">
                <span className="hidden-link-text">LOGO</span>
              </a>
            </div>
            <div className="footer-menu">
              <h2 className="footer-menu-name">Commencer</h2>
              <ul id="menu-get-started" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                <a onClick={handleClickDescription} className="white-link">
    À propos de nous
  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="/accessibility">Accessibilité</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name">Mediathèque</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="/resources/media/audio-podcast">Audio & Podcast</a>
                </li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a href="/resources/media/video">Vidéo</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name">Liens rapides</h2>
              <ul id="menu-quick-links" className="footer-menu-list">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a
                    href="/services-et-droits/services"
                  >
                    Services
                  </a>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a
                    href="/services-et-droits/droits"
                  >
                    Droits
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="/services-et-droits/opportunites">Opportunités</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="/blog">Blog</a>
                </li>
                <li className="menu-item menu-item-type-post_type_archive menu-item-object-customer">
                  <a href="/savoir-lab/wikiphedia">WikiPHédia</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="/news-events/news">Actualités</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title">Discutons</h2>
              <p className="footer-call-to-action-description">
                Avez-vous une question de support ?
              </p>
              <a
                className="footer-call-to-action-button button"
                href="/contactez-nous"
                target="_self"
              >
                Contactez-nous
              </a>
              <p className="footer-disclaimer">
              Disclaimer : Les idées et les opinions exprimées dans cette plateforme sont celles des auteurs ; elles ne reflètent pas nécessairement les points de vue de l’Association IBSAR ou de l’UNESCO et n’engagent en aucune façon ces organisations.
              </p>
            </div>
          </div>
</div>
        <div className="footer-copyright">
          <div className="footer-copyright-wrapper">
            <p className="footer-copyright-text">
              &copy; {year} Fidni. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
