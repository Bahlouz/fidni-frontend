import React from "react";
import Home2 from "./Home2";
import { Container, Row, Col } from "react-bootstrap";
import QuiSommeNous from "../About/Description/QuiSommesNous";
import QuoteComponent from "../About/Quote";
import Type from "./Type";
import { useTranslation } from "react-i18next"; // Import the hook
import coalitiondoc from '../..//Assets/coalition1.png';
import downloadimg from '../../Assets/download.png';

function Home() {
  const { t,i18n } = useTranslation(); // Initialize translation
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  return (
    <section className="home-main-section">
      <Container fluid className="home-section" id="home">
        <Row className="align-items-center">
          <Col xs={12} className="p-0">
            <div className="home_img">
              <div className="overlay-home" id="overlay-home">
                <h1 className="home-title text-center text-md-left">
                  <Type /> {/* Use the Type component here */}
                </h1>
                <p className="home-intro text-center text-md-left">
                  {t("home.intro")}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <QuiSommeNous />
      <Home2 />
      <QuoteComponent />
      <Container fluid className="droits-container">
    <div className="background-image-coalition" >
      <div className="p-5 overlay-text-droits" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
        <h1 className="droits-titre">{t('coalition.coalitionTitle')}</h1>
      </div>
    </div>
    <div>
      <div className="coalition-description">
        <Container className="convention-container">
          <Row>
            <Col>
              <p className="convention-text">{t('coalition.coalitionDescription1')}</p>
              <p className="convention-text">{t('coalition.coalitionDescription2')}</p>
              <p>{t('coalition.coalitionDescription3')}</p>
              <p>{t('coalition.coalitionDescription4')}</p>
            </Col>
          </Row>
          <Row>
            <Col className='liens-conventions'>
              <div className="guide-preview">
              </div>
              <a 
                href={`/savoir-lab/communication-inclusive/charte-nationale/coalition`}
                className="french-link"
                rel="noopener noreferrer"
              >
                {t('coalition.accesscharte')}
              </a>
            </Col>
          </Row>
        </Container>
      </div>  
    </div>
  </Container>
    </section>
  );
}

export default Home;
