  import React from 'react';
  import { Container, Row} from 'react-bootstrap';
  import { useTranslation } from 'react-i18next';
  import './AccessMedia.css';

  const AccessMedia = () => {
    const { t ,i18n } = useTranslation();
    const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
    return (
      <Container fluid className="Accessibility-container">
        <div className="background-image-Accessibility">
          <div className="p-5 overlay-text-Accessibility" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
            <h1 className="Accessibility-titre">{t('AccessMedia.accessibility_title')}</h1>
          </div>
        </div>
        <Container className="convention-container">
      <Row>
      <div>
        <h2>{t('AccessMedia.section_one_title')}</h2>
        <p>
        {t('AccessMedia.section_one_paragraph1')} <sup>3</sup>
        {t('AccessMedia.section_one_paragraph2')} <sup>4</sup> {t('AccessMedia.section_one_paragraph3')} <sup>5</sup> 

        </p>
        <p>
        {t('AccessMedia.best_practices_title')}<sup>6</sup>:
        </p>
        <ul style={{ paddingLeft: "5em", direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
      <li>
      {t('AccessMedia.best_practices.best_pr1')}
      </li><br />
      <li>
      {t('AccessMedia.best_practices.best_pr2')}
      </li><br />
      <li>
      {t('AccessMedia.best_practices.best_pr3')}
      </li><br />
      <li>
      {t('AccessMedia.best_practices.best_pr4')}
      </li><br />
    </ul>
    <h2>{t('AccessMedia.section_two_title')}</h2>
    <p>
    {t('AccessMedia.section_two_paragraphs.section_two_pr1')}
    </p>
    <p>
    {t('AccessMedia.section_two_paragraphs.section_two_pr2')}
    </p>
    <p>
    {t('AccessMedia.section_two_paragraphs.section_two_pr3')}
    </p>
    <p>
    {t('AccessMedia.section_two_paragraphs.section_two_pr4')}
    </p>
    <p>
    {t('AccessMedia.section_two_paragraphs.section_two_pr5')}
    </p>
    <ol style={{ paddingLeft: "5em" }}>
    {t("AccessMedia.recommendations", { returnObjects: true }).map((item, index) => (
  <li key={index}>
    <strong>{item.title}</strong> : {item.description}
    <br /><br />
  </li>
))}
    </ol>
    <p>
    {t('AccessMedia.final_note')}
    </p>
    <p style={{borderTop: '1px solid',marginTop:"2em"}}>
              <sup>3</sup><small>{t('AccessMedia.references.reference_one')}</small><br />
              <p>
              <sup>4</sup><small>{t('AccessMedia.references.reference_two')}</small><br />
              <sup>5</sup><small>{t('AccessMedia.references.reference_three')}</small><br />
              <sup>6</sup><small>{t('AccessMedia.references.reference_four')}</small><br />
            </p>
            </p>
  </div>
      </Row>
      </Container>
      </Container>
    );
  };

  export default AccessMedia;
