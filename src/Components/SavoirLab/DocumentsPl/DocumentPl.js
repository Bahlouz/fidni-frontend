import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './DocumentPl.css';

const DocumentPl = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = 'https://admin.fidni.tn';

    const pdfList = [
        {
            title: 'Etude Sur Les Droits Politiques Et Culturels Des Personnes Handicapées En Tunisie',
            description: "Cette étude examine la participation des personnes handicapées à la vie politique et culturelle en Tunisie, en soulignant les obstacles importants qu'elles rencontrent. Malgré les avancées législatives, telles que les articles 29 et 30 de la Convention relative aux droits des personnes handicapées (CDPH), ces individus continuent de faire face à des lois restrictives, des obstacles institutionnels et des pratiques discriminatoires qui les excluent largement de ces sphères. L'objectif principal de l'étude est de définir clairement les droits politiques et culturels des personnes handicapées en Tunisie et d’identifier les défis rencontrés au sein du cadre législatif actuel, en mettant en évidence les écarts par rapport aux normes internationales. L'étude se concentre sur trois sites en Tunisie (Tunis, Bizerte, Médenine), choisis pour leur diversité géographique et économique. Elle examine les obstacles à la participation politique et culturelle, notamment les défis législatifs et les pratiques discriminatoires. Les objectifs incluent également la recherche de pratiques prometteuses et la proposition de mesures concrètes pour améliorer l'accès et la participation des personnes handicapées. En conclusion, l'étude vise à combler le fossé entre les normes juridiques et la réalité pratique en Tunisie, en mettant en lumière les défis auxquels sont confrontées les personnes handicapées et en formulant des recommandations pour renforcer leur inclusion et leur participation effective dans la vie politique et culturelle.",
            link: `${process.env.PUBLIC_URL}/pdfs/Etude Sur Les Droits Politiques Et Culturels Des Personnes Handicapées En Tunisie.pdf`,
            imageUrl: `${process.env.PUBLIC_URL}/pdfs/etude2.png` 
        },
        {
            title: 'Guide de formation sur l’Education Complète a la sexualité pour des personnes en situation de hand',
            description: "Le guide \"Éclairant les Chemins\" vise à offrir une éducation sexuelle complète et inclusive aux personnes en situation de handicap visuel. Il fournit des informations accessibles sur la santé sexuelle et reproductive, en mettant l'accent sur l'autonomie, le respect, et l'inclusion. Ce guide répond aux besoins spécifiques de cette population, comble les lacunes d'information et corrige les malentendus passés concernant l'éducation sexuelle, en promouvant l'égalité d'accès, la prévention des risques, et le respect des droits.",
            link: `${process.env.PUBLIC_URL}/pdfs/Guide de formation sur l’Education Complète a la sexualité pour des personnes en situation de hand.pdf`,
            imageUrl: `${process.env.PUBLIC_URL}/pdfs/guide.png` 
        },
        {
            title: 'ETUDE SUR L’ACCESSIBILITE AUX STRUCTURES DE PRISE EN CHARGE DES VIOLENCES BASEES SUR LE GENRE POUR LES FEMMES EN SITUATION DE HANDICAP VICTIMES DE VIOLENCE',
            description: "L'amélioration de l'inclusion des personnes en situation de handicap, notamment des femmes victimes de violence, passe par une analyse approfondie de l'accessibilité des services qui leur sont dédiés. Cette étude vise à établir un diagnostic initial de l'accessibilité en identifiant les divers types de barrières rencontrées par toutes les catégories de déficience, tout en hiérarchisant les enjeux prioritaires à améliorer en fonction des types de structures, comme les centres d'écoute, d'orientation et d'hébergement. L'évaluation examine également l'adéquation des services d'accompagnement aux besoins spécifiques des femmes en situation de handicap. Elle repose sur deux volets principaux : un questionnaire destiné aux directeurs des structures concernées et des entretiens semi-dirigés avec les professionnels en charge de l'accueil, de l'orientation, et de l'accompagnement. Cette analyse a permis d'identifier les écarts et dysfonctionnements existants au sein des services dédiés à ces femmes, révélant des points d'amélioration essentiels pour assurer une prise en charge plus inclusive. Sur la base de ces constats, l'étude formule des recommandations concrètes pour améliorer l'accessibilité physique, organisationnelle et la sensibilisation au sein de ces structures. Ces recommandations sont adaptées aux spécificités locales, tenant compte des ressources disponibles et des bonnes pratiques internationales, avec pour objectif final de garantir un accès équitable et adapté aux services de soutien et de protection pour les femmes victimes de violence en situation de handicap.",
            link: `${process.env.PUBLIC_URL}/pdfs/ETUDE SUR L’ACCESSIBILITE AUX STRUCTURES DE PRISE EN CHARGE DES VIOLENCES BASEES SUR LE GENRE POUR.pdf`,
            imageUrl: `${process.env.PUBLIC_URL}/pdfs/etude1.png`
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/post-blogs?populate=*`);
                const data = await response.json();

                const filteredData = data.data.filter(item =>
                    item.attributes.subcategory?.data?.attributes?.name === 'Documents de plaidoyer'
                );

                const formattedData = filteredData.map(item => ({
                    title: item.attributes.Title,
                    description: item.attributes.Description.map(desc => desc.children.map(child => child.text).join('')).join('\n'),
                    link: item.attributes.Mediafiles?.data?.[0]?.attributes?.url
                        ? `${BASE_URL}${item.attributes.Mediafiles.data[0].attributes.url}`
                        : '',
                    imageUrl: item.attributes.Mediafiles?.data?.[1]?.attributes?.formats?.medium?.url
                        ? `${BASE_URL}${item.attributes.Mediafiles.data[1].attributes.formats.medium.url}`
                        : ''
                }));

                setFetchedData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePdfOpen = (pdfLink) => {
        window.open(pdfLink, '_blank');
    };

    const combinedData = [...pdfList, ...fetchedData];

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div className="background-image-DocumentPl"></div>
            <Container fluid className="DocumentPl-container">
                <div className="p-5 overlay-text-DocumentPl">
                    <h1 className="DocumentPl-titre">Documents de plaidoyer</h1>
                    <p className="DocumentPl-description">
                        Vous allez trouver dans cette section des informations concernant les documents de plaidoyer...
                    </p>
                </div>
                <Row className="pdf-list">
                    {combinedData.map((pdf, index) => (
                        <Col key={index} xs={12} className="mb-4">
                            <Card className="card-plaidoyer">
                                <Card.Body className="d-flex align-items-start">
                                    {pdf.imageUrl && (
                                        <img src={pdf.imageUrl} alt={pdf.title} className="pdf-image me-3" />
                                    )}
                                    <div>
                                        <Card.Title>{pdf.title}</Card.Title>
                                        <Card.Text className="DocumentPl-description">{pdf.description}</Card.Text>
                                        <Card.Link
                                            href="#"
                                            onClick={() => handlePdfOpen(pdf.link)}
                                            rel="noopener noreferrer"
                                        >
                                            Voir PDF
                                        </Card.Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default DocumentPl;