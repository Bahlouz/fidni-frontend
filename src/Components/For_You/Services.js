import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Services.css';
import downloadbutton from '../../Assets/downloadimg.png';

const Services = () => {
  const [apiCardData, setApiCardData] = useState([]);

  
  const cardData = [
    {
      title: "Comment obtenir une carte d'handicap ?",
      documentTitleFrench: "Délivrance d'une carte d'handicap",
      documentTitleArabic: "إسناد بطاقة الإعاقة",
      previewImage: `${process.env.PUBLIC_URL}/services/Delivrance.png`,
      pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Délivrance_d'une_carte_d'handicap.docx`,
      pdfLinkArabic: `${process.env.PUBLIC_URL}/services/إسناد بطاقة الإعاقة.docx`
    },
    {
      title: "Comment renouveler la carte d'handicap ?",
      documentTitleFrench: "Renouvellement de la carte d'handicap",
      documentTitleArabic: "تجديد بطاقة الإعاقة",
      previewImage: `${process.env.PUBLIC_URL}/services/Renouvellement.png`,
      pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Renouvellement_de_la_carte_d'handicap.docx`,
      pdfLinkArabic: `${process.env.PUBLIC_URL}/services/تجديد بطاقة الإعاقة.docx`
    },
    {
      title: "Quelles sont les adresses des services de santé sexuelle et reproductive fournis par l'Office national de la famille ?",
      documentTitleFrench: "Adresses des services de santé sexuelle et reproductive fournis par l'Office national de la famille",
      documentTitleArabic: "هياكل الصحة الجنسية و الإنجابية حسب الجهات",
      previewImage: `${process.env.PUBLIC_URL}/services/Adresses.png`,
      pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Adresses_des_services_de_santé_sexuelle_et_reproductive_fournis_par_l'Office_national_de_la_famille.docx`,
      pdfLinkArabic: `${process.env.PUBLIC_URL}/services/هياكل الصحة الجنسية و الإنجابية حسب الجهات.docx`
    },
    {
      title: "Quel est le répertoire des structures œuvrant dans le domaine du handicap en Tunisie ?",
      documentTitleFrench: "Répertoire des structures œuvrant dans le domaine du handicap en Tunisie",
      documentTitleArabic: "دليل الهياكل العاملة في مجال الإعاقة في تونس",
      previewImage: `${process.env.PUBLIC_URL}/services/Repertoire.png`,
      pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Répertoire_des_structures_œuvrant_dans_le_domaine_du_handicap_en_Tunisie.docx`,
      pdfLinkArabic: `${process.env.PUBLIC_URL}/services/دليل الهياكل العاملة في مجال الإعاقة في تونس.docx`
    },
    {
      title: "Découvrez le guide des services de santé reproductive et sexuelle pour les personnes en situation de handicap.",
      documentTitleFrench: "Guide des services de santé reproductive et sexuelle pour les personnes en situation de handicap",
      documentTitleArabic: "دﻟﻴﻞ ﺗﻮﺟﻴﻬﻲ ﻟﺨﺪﻣﺎت اﻟﺼﺤﺔ اﻹﻧﺠﺎﺑﻴﺔ واﻟﺠﻨﺴﻴﺔ ﻟﻸﺷﺨﺎص ذوي وذوات اﻹﻋﺎﻗﺔ",
      previewImage: `${process.env.PUBLIC_URL}/services/ssr.png`,
      pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Carte_des_Services_de_Santé_Reproductive_et_Sexuelle_Accessibles.docx`,
      pdfLinkArabic: `${process.env.PUBLIC_URL}/services/Carto_SSR_accessible_ar.docx`
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post-blogs?populate=*');
        const result = await response.json();

        // Filter by subcategory "Services"
        const filteredData = result.data.filter(
          (item) => item.attributes.subcategory.data?.attributes?.name === 'Services'
        );

        if (filteredData.length > 0) {
          const formattedData = filteredData.map((item) => {
            const { attributes } = item;

            // Extract document titles from description
            const description = attributes.Description || [];
            const documentTitleFrench = description.find(
              (desc) => desc.type === 'paragraph' && desc.children.some(child => child.text.startsWith('<fr>'))
            )?.children[0]?.text.replace('<fr>', '').replace('</fr>', '') || '';

            const documentTitleArabic = description.find(
              (desc) => desc.type === 'paragraph' && desc.children.some(child => child.text.startsWith('<ar>'))
            )?.children[0]?.text.replace('<ar>', '').replace('</ar>', '') || '';

            // Extract image URL from Mediafiles
            const mediaFiles = attributes.Mediafiles.data || [];
            const thumbnailImage = mediaFiles.find(media => media.attributes.mime.startsWith('image'))?.attributes.url || '';

            // Properly construct the full image URL if the image exists
            const previewImage = thumbnailImage ? `${thumbnailImage}` : '';

            // Extract PDF links
            const pdfLinks = mediaFiles.reduce(
              (acc, media) => {
                const fileName = media.attributes.name.toLowerCase();
                if (fileName.includes('fr')) {
                  acc.pdfLinkFrench = `${media.attributes.url}`;
                } else if (fileName.includes('ar')) {
                  acc.pdfLinkArabic = `${media.attributes.url}`;
                }
                return acc;
              },
              { pdfLinkFrench: '', pdfLinkArabic: '' }
            );

            return {
              title: attributes.Title,
              documentTitleFrench: documentTitleFrench,
              documentTitleArabic: documentTitleArabic,
              previewImage: previewImage,  // Use the properly constructed preview image URL
              pdfLinkFrench: pdfLinks.pdfLinkFrench,
              pdfLinkArabic: pdfLinks.pdfLinkArabic,
            };
          });

          setApiCardData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const combinedData = [...cardData, ...apiCardData];

  return (
    <Container fluid className="p-0 services-container">
      <div className="background-image-services">
        <div className="overlay-text-services">
          <h1 className="services-titre">SERVICES</h1>
          <p className="services-description">Vous allez trouver dans cette section des informations sur les services aux personnes handicapées en Tunisie.</p>
        </div>
      </div>
      <Row className="justify-content-center">
        {combinedData.map((card, index) => (
          <Col key={index} md={10} className="mb-4">
            <div className="service-card">
              <h2 className="service-card-title">{card.title}</h2>
              <Row className="justify-content-center preview-row">
                <Col md={5} className="text-center">
                  <a 
                    href={card.pdfLinkFrench} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download  // Add download attribute
                  >
                    <div className="preview-row">
                      <div className="document-title">{card.documentTitleFrench}</div>
                      <img 
                        src={downloadbutton}
                        alt="Download"
                        className="service-card-download-icon"
                      />
                      <img src={card.previewImage} alt={`Preview of ${card.title} in French`} className="service-card-image" />
                    </div>
                  </a>
                </Col>
                <Col md={5} className="text-center">
                  <a 
                    href={card.pdfLinkArabic} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download  // Add download attribute
                  >
                    <div className="preview-row">
                      <div className="document-title">{card.documentTitleArabic}</div>
                      <img 
                        src={downloadbutton}
                        alt="Download"
                        className="service-card-download-icon"
                      />
                      <img src={card.previewImage} alt={`Preview of ${card.title} in Arabic`} className="service-card-image" />
                    </div>
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;