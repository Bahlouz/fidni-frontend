import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useInView } from 'react-intersection-observer';
import { newsItems } from "../News_&_Events/News/newsItems";
import DescriptionOfConcept from "../About/Description/Description";

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
  const latestNews = newsItems[0]; // Assuming the first item is the latest news

  return (
    <Container fluid className="d-flex justify-content-center align-items-center p-0" style={{ minHeight: '100vh' }}>
      <section>
        <section className="statistics-section text-center">
          <h1 className="home-chiffre">Chiffres Clés</h1>
          <Row className="justify-content-center">
            <Col className="d-flex flex-column align-items-center">
              <div className="stat-circle">
                <Counter targetNumber={77} />
                <p className="service-name">Services de santé sexuelle et reproductive de l'Office national de la famille</p>
              </div>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <div className="stat-circle">
                <Counter targetNumber={54} />
                <p>Services de Santé Reproductive et Sexuelle Accessibles pour les Personnes en Situation de Handicap</p>
              </div>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <div className="stat-circle">
                <Counter targetNumber={181} />
                <p>Structures œuvrant dans le domaine du handicap en Tunisie</p>
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