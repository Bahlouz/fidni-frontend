import React from "react";
import Home2 from "./Home2";
import { Container, Row, Col } from "react-bootstrap";
import QuiSommeNous from "../About/Description/QuiSommesNous";
import QuoteComponent from "../About/Quote";
import Type from "./Type"; // Import the Type component

function Home() {
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
                  Fidni est un carrefour multipartite et accessible qui regroupe les personnes handicapées et les acteurs engagés pour la promotion de leurs droits et services en Tunisie, pour un changement des mentalités sur le handicap.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <QuiSommeNous />
      <Home2 />
      <QuoteComponent />
    </section>
  );
}

export default Home;
