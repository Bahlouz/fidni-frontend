import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "./Wikid.css";
import WikidiPreview from './WikidiPreview'; // Import the WikidiPreview component


const Wikidi = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop(); // Extract current page from URL

    // Updated links based on your provided categories
    const wikidlinks = [
        { title: 'Les acteurs sociaux et politiques', link: '/savoir-lab/wikiphedia/acteurs-sociaux-politiques', page: 'acteurs-sociaux-politiques' },
        { title: 'Les artistes', link: '/savoir-lab/wikiphedia/artistes', page: 'artistes' },
        { title: 'Les chercheurs', link: '/savoir-lab/wikiphedia/chercheurs', page: 'chercheurs' },
        { title: 'Les entrepreneurs', link: '/savoir-lab/wikiphedia/entrepreneurs', page: 'entrepreneurs' },
        { title: 'Les sportifs', link: '/savoir-lab/wikiphedia/sportifs', page: 'sportifs' }
    ];

    return (
        <>
            <div className="background-image-wikiphedia">
                <div className="overlay-text-wikiphedia">
                    <h1 className="wikiphedia-titre">Wikiphedia</h1>
                    <p className="p-5 sportifs-description">
                        Vous allez trouver dans cette section des informations sur WikiPHédia. Cette initiative a pour objectif de sensibiliser au manque d’informations concernant les personnes handicapées qui ont grandement contribué à leurs communautés, et mettre en lumière l’importance de la médiatisation des personnes en situation de handicap. 
                    </p>
                </div>
                
                <div className="button-container">
                    {wikidlinks.map((item, index) => (
                        <Button
                            key={index}
                            className={`wikid-button ${currentPath === item.page ? 'active' : ''}`}
                            href={item.link} // Navigate to the new page
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Article preview section */}
            <Container>
                <Row>
                <p className="mt-5  wikiphedia-description">
                        Découvrez des profils détaillés d'artistes, d'athlètes paralympiques, et d'entrepreneurs de scientifiques et d'autres profils de personnes en situation de handicap, Explorez leurs réalisations, parcours et contributions dans divers domaines pour vous inspirer et vous informer.
                    </p>
                    <Col>
                        <WikidiPreview />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Wikidi;
