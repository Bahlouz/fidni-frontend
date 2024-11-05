import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Cadre.css';

const Convention = () => {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  return (
    <>
      <div className="background-image-droits">
        <div className="overlay-text-droits-singlepage">
          <h1 className="p-5 droits-titre-singlepage" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('cadre.background_image_title')}</h1>
        </div>
      </div>

      <Container className="convention-container">
        <Row>
          <div>
            <p>{t('cadre.paragraph_1')}</p>
            <p>
              {t('cadre.paragraph_2')}« <strong>{t('cadre.paragraph_2_strong')} ».</strong>
            </p>
            <p>{t('cadre.paragraph_3')}</p>
            <ul style={{ paddingLeft: "5em" }}>
              <li style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('cadre.list_item_1')}</li>
              <li style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('cadre.list_item_2')}</li>
              <li style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('cadre.list_item_3')}</li>
              <li style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('cadre.list_item_4')}</li>
              <li style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('cadre.list_item_5')}</li>
              <li style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('cadre.list_item_6')}</li>
            </ul>
            <p>{t('cadre.paragraph_4')}</p>
            <p>{t('cadre.paragraph_5')} <b>{t('cadre.paragraph_5_strong')}</b></p>
          </div>
        </Row>
        <Container fluid className="regulations-table">
          <h2>{t('cadre.table_title')}</h2>
          <table bordered responsive>
            <tbody>
              <tr>
                <td className="td-constitution-2022">
                  <p>{t('cadre.constitution_2022_title')}</p>
                </td>
                <td className="td-constitution-2014">
                  <p>{t('cadre.constitution_2022_content')}</p>
                </td>
                <td className="td-law-2005-83">
                  <p>{t('cadre.constitution_2014_content')}</p>
                </td>
                <td className="td-law-2016-61">
                  <p>{t('cadre.law_2005_83_content')}</p>
                </td>
              </tr>
              <tr>
                <td className="td-law-83-2005">
                  <p>{t('cadre.law_2016_61_content')}</p>
                </td>
                <td className="td-decree-1996">
                  <p>{t('cadre.decree_1996_content')}</p>
                </td>
                <td className="td-decree-2005-3029">
                  <p>{t('cadre.decree_2005_3029_content')}</p>
                </td>
                <td className="td-decree-2005-3086">
                  <p>{t('cadre.cadre.decree_2005_3086_content')}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
        <p>{t('cadre.carte_handicap')}</p>
        <a target='_blank' rel='noreferrer' href="https://www.social.gov.tn/fr/attribution-de-carte-de-handicap">
          {t('cadre.carte_handicap_link')}
        </a>
      </Container>
    </>
  );
};

export default Convention;
