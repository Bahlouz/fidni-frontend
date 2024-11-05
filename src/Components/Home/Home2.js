import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useInView } from 'react-intersection-observer';
import { newsItems } from "../News_&_Events/News/newsItems";
import DescriptionOfConcept from "../About/Description/Description";
import { useTranslation } from "react-i18next"; // Import the hook

const Counter = ({ targetNumber }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 3500;
      const increment = targetNumber / (duration / 10);

      const counter = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          start = targetNumber;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 10);

      return () => clearInterval(counter);
    }
  }, [inView, targetNumber]);

  return (
    <p ref={ref} className="stat-number">{count}</p>
  );
};

function Home2() {
  const { t, i18n } = useTranslation(); // Initialize translation

  // Determine alignment and direction based on current language
  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left';
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const latestNews = newsItems[0]; // Assuming the first item is the latest news

  return (
    <Container fluid className="d-flex justify-content-center align-items-center p-0" style={{ minHeight: '100vh', direction: direction }}>
      <section>
        <section className={`statistics-section ${textAlignment} text-center`}>
          <h1 className="home-chiffre">{t("home2.keyFigures")}</h1>
          <Row className="justify-content-center">
            <Col className="d-flex flex-column align-items-center">
              <div className="stat-circle">
                <Counter targetNumber={77} />
                <p className="service-name">{t("home2.healthServices")}</p>
              </div>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <div className="stat-circle">
                <Counter targetNumber={54} />
                <p>{t("home2.accessibleServices")}</p>
              </div>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <div className="stat-circle">
                <Counter targetNumber={181} />
                <p>{t("home2.structures")}</p>
              </div>
            </Col>
          </Row>
        </section>
        <section id="description">
          <DescriptionOfConcept />
        </section>
      </section>
    </Container>
  );
}

export default Home2;
