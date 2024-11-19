import React from 'react';
import { Container,Table } from 'react-bootstrap';
import './AppuiActeurs.css';
import fiche7 from "../../../../Assets/fiches/fiche7.png";
import fiche8 from "../../../../Assets/fiches/fiche8.png";
import fiche9 from "../../../../Assets/fiches/fiche9.png";
import downloadimg from "../../../../Assets/downloadimg.png";
import { useTranslation } from 'react-i18next';
const AppuiActeurs = () => {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const headers = t("AppuiActeurs.ficher92.table.headers", { returnObjects: true });
  const instructionsDetails = t("AppuiActeurs.fiche92.instructionDetails" , {returnObjects: true});
  const sections = t('AppuiActeurs.fiche91.sections', { returnObjects: true });
  return (
    <Container fluid className="appui-acteurs-container">
      <div className="appui-acteurs-background">
        <div className="appui-acteurs-overlay" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="appui-acteurs-title">{t('AppuiActeurs.fr.appuiActeursTitle')}</h1>
        </div>
      </div>
      <Container className="appui-acteurs-content" >
        <h2>{t('AppuiActeurs.fr.importanceAccessibilite')}</h2>
        <p>
        {t('AppuiActeurs.fr.lienHandicapAccessibilite')}
        </p>

        <h3>{t('AppuiActeurs.fr.nuancesAccessibiliteInclusivite')}</h3>
        <Table striped bordered hover responsive className="appui-acteurs-table">
          <thead>
            <tr>
              <th>{t('AppuiActeurs.fr.accesstitle')}</th>
              <th>{t('AppuiActeurs.fr.inclutitle')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{t('AppuiActeurs.fr.objtitle')}</strong> {t('AppuiActeurs.fr.accessibiliteObjectif')}
              </td>
              <td>
                <strong>{t('AppuiActeurs.fr.objtitle')}</strong>  {t('AppuiActeurs.fr.inclusiviteObjectif')}
              </td>
            </tr>
            <tr>
              <td>
                <strong>{t('AppuiActeurs.fr.focustitle')}</strong> {t('AppuiActeurs.fr.accessibiliteFocus')}
              </td>
              <td>
                <strong>{t('AppuiActeurs.fr.focustitle')}</strong>  {t('AppuiActeurs.fr.inclusiviteFocus')}
              </td>
            </tr>
            <tr>
              <td>
                <strong>{t('AppuiActeurs.fr.exptitle')}</strong> {t('AppuiActeurs.fr.accessibiliteExemples')}
              </td>
              <td>
                <strong>{t('AppuiActeurs.fr.exptitle')}</strong>  {t('AppuiActeurs.fr.inclusiviteExemples')}
              </td>
            </tr>
          </tbody>
        </Table>

        <p>
        {t('AppuiActeurs.fr.garantieAcces')}
        </p>
        <p>
          <strong>{t('AppuiActeurs.fr.accestitle1')}</strong>: {t('AppuiActeurs.fr.adaptationAccessibilite')}
        </p>
        <p>
          <strong>{t('AppuiActeurs.fr.accestitle2')}</strong>: {t('AppuiActeurs.fr.conceptionUniverselle')}
        </p>
        <p>
          <strong>{t('AppuiActeurs.fr.accestitle3')}</strong>: {t('AppuiActeurs.fr.designInclusif')}
        </p>
        <p>
        {t('AppuiActeurs.fr.objectifCommun')}
        </p>
        <div className="lexique-column">
        <div className="lexique-preview">
          <img 
            src={fiche7}
            alt={t('AppuiActeurs.lexique.preview.imageAlt')} 
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 7 word.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 7 word.pdf` }
              target="_blank"
              src={downloadimg} 
              alt={t('AppuiActeurs.lexique.preview.download.link')} 
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 7 word.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          {t('AppuiActeurs.fr.accederLexiqueFrancais')}
        </a>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 7  Comprendre l'Importance de l'Accessibilité pour promouvoir l’inclusivité_VAR.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
          style={{marginBottom:"3em"}}
        >
          {t('AppuiActeurs.fr.accederLexiqueArabe')}
        </a>
      </div>
          <div className="fiche8">
        <h1 className="fiche8-title">{t('AppuiActeurs.fiche8.title')}</h1>
        <div className="fiche8-section">
          <h2 className="fiche8-section-title">{t('AppuiActeurs.fiche8.sections.accessibility.title')}</h2>
          <p className="fiche8-section-text">{t('AppuiActeurs.fiche8.sections.accessibility.text')}</p>
        </div>
        <div className="fiche8-section">
          <h2 className="fiche8-section-title">{t('AppuiActeurs.fiche8.sections.journalistic_importance.title')}</h2>
          <p className="fiche8-section-text">{t('AppuiActeurs.fiche8.sections.journalistic_importance.text')}</p>
        </div>
        <div className="fiche8-section">
          <h2 className="fiche8-section-title">{t('AppuiActeurs.fiche8.sections.key_elements.title')}</h2>
          <div className="fiche8-subsection">
            <h3 className="fiche8-subsection-title">{t('AppuiActeurs.fiche8.sections.key_elements.subsections.a_parking.title')}</h3>
            <ul className="fiche8-subsection-list">
              <li className="fiche8-subsection-list-item" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('AppuiActeurs.fiche8.sections.key_elements.subsections.a_parking.list')}</li>
            </ul>
          </div>
          <div className="fiche8-subsection">
            <h3 className="fiche8-subsection-title">{t('AppuiActeurs.fiche8.sections.key_elements.subsections.b_sidewalks.title')}</h3>
            <ul className="fiche8-subsection-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
              {t("AppuiActeurs.fiche8.sections.key_elements.subsections.b_sidewalks.list", { returnObjects: true }).map((item, index) => (
              <li className="fiche8-subsection-list-item" key={index} >
                {item}
              </li>
            ))}
            </ul>
          </div>
          <div className="fiche8-subsection">
            <h3 className="fiche8-subsection-title">{t('AppuiActeurs.fiche8.sections.key_elements.subsections.c_street_furniture.title')}</h3>
            <ul className="fiche8-subsection-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
            {t("AppuiActeurs.fiche8.sections.key_elements.subsections.c_street_furniture.list", { returnObjects: true }).map((item, index) => (
              <li className="fiche8-subsection-list-item" key={index}>
                {item}
              </li>
            ))}
            </ul>
          </div>
        </div>
        <div className="fiche8-section">
          <h2 className="fiche8-section-title">{t('AppuiActeurs.fiche8.sections.methodology.title')}</h2>
          <p className="fiche8-section-text">{t('AppuiActeurs.fiche8.sections.methodology.text')}</p>
          <ul className="fiche8-section-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          {t("AppuiActeurs.fiche8.sections.methodology.list", { returnObjects: true }).map((item, index) => (
              <li className="fiche8-subsection-list-item" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="fiche8-section">
          <h2 className="fiche8-section-title">{t('AppuiActeurs.fiche8.sections.reporting_goals.title')}</h2>
          <ul className="fiche8-section-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          {t("AppuiActeurs.fiche8.sections.reporting_goals.list", { returnObjects: true }).map((item, index) => (
              <li className="fiche8-subsection-list-item" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      <div className="lexique-column">
        <div className="lexique-preview">
          <img 
            src={fiche8}
            alt={t('AppuiActeurs.lexique.preview.imageAlt')}  
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 8 word.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 8 word.pdf` }
              target="_blank"
              src={downloadimg} 
              alt={t('AppuiActeurs.lexique.preview.download.link')}  
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 8 word.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          {t('AppuiActeurs.fr.accederLexiqueFrancais')}
        </a>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 8 Réaliser un reportage sur l’accessibilité des Espaces Publics Urbains_ VAR.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
          style={{marginBottom:"3em"}}
        >
          {t('AppuiActeurs.fr.accederLexiqueArabe')}
        </a>
      </div>
    </div>
    <div className="fiche9-container">
      <h2 className="fiche9-title">{t('AppuiActeurs.fiche91.title')} </h2>
      <div >
      {sections.map((section, index) => (
        <div className="fiche9-section" key={index}>
          <h3 className="fiche9-section-title">{section.title}</h3>
          {section.paragraph && (
            <p className="fiche9-section-paragraph">{section.paragraph}</p>
          )}
          {section.list && (
            <ul className="fiche9-section-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
              {section.list.map((item, itemIndex) => (
                <li className="fiche9-section-list-item" key={itemIndex}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
      <h4 className="fiche9-subtitle">{t('AppuiActeurs.fiche91.observationSheet.title')}</h4>
      <div className="fiche9-section">
        <h5 className="fiche9-section-title">{t('AppuiActeurs.fiche91.observationSheet.generalInfo.title')}</h5>
        <ul className="fiche9-section-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          {t("AppuiActeurs.fiche91.observationSheet.generalInfo.list", { returnObjects: true }).map((item) => (
        <li className="fiche9-section-list-item">
          {item}
          <br />
        </li>
        ))}
        </ul>
      </div>
      <div className="fiche9-section">
        <h4 className="fiche9-section-title">{t('AppuiActeurs.fiche91.observationSheet.accessibilityEvaluation.title')}</h4>
        <table className="fiche9-table">
  <thead>
    <tr>
    {t("AppuiActeurs.fiche91.observationSheet.accessibilityEvaluation.tableHeaders", { returnObjects: true }).map((item) => (
        <th>
          {item}
          <br />
        </th>
        ))}
    </tr>
  </thead>
  <tbody>
  {t("AppuiActeurs.fiche91.observationSheet.accessibilityEvaluation.criteria", { returnObjects: true }).map((criterion, index) => (
    <tr key={index}>
      <td className="fiche9-table-cell">{criterion.number}</td>
      <td className="fiche9-table-cell">{criterion.recommendation}</td>
      {criterion.checkboxes.map((checkbox, checkboxIndex) => (
        <td className="fiche9-table-cell" key={checkboxIndex}>
          <input
            type="checkbox"
            className="fiche9-checkbox"
            defaultChecked={checkbox.exists}
          />
        </td>
      ))}
      <td className="fiche9-table-cell">
        <input
          type="number"
          className="fiche9-number-input"
          min="0"
          max="10"
          defaultValue={criterion.score}
        />
      </td>
    </tr>
  ))}
  </tbody>
</table>
      </div>
    </div>
    <div className="fiche9">
      
      <div className="fiche9-title">{t('AppuiActeurs.fiche92.totalAccessibilityScore')}</div>
      <div className="fiche9-title">{t('AppuiActeurs.fiche92.averageCriteriaRespect')}</div>
      <table className="fiche9-table">
      <thead>
    <tr>
     <th>{t('AppuiActeurs.fiche92.table.headers.c')}</th>
     <th>{t('AppuiActeurs.fiche92.table.headers.n')}</th>
    </tr>
  </thead>
        <tbody>
          <tr>
            <td>{t('AppuiActeurs.fiche92.table.rows.criteriaRespect')}</td>
            <td>{t('AppuiActeurs.fiche92.table.rows.note')}</td>
          </tr>
        </tbody>
      </table>
      <div className="fiche9-text">{t('AppuiActeurs.fiche92.accessibilityAverageText')}</div>
      <div className="fiche9-title">{t('AppuiActeurs.fiche92.instructions')}</div>
      <div>
  {Array.isArray(instructionsDetails) ? (
    instructionsDetails.map((instruction, index) => (
      <div key={index} className="fiche9-text">
        {instruction}
      </div>
    ))
  ) : (
    <div className="fiche9-text">Error: Instructions are not available.</div>
  )}
</div>

      <div className="lexique-column">
        <div className="lexique-preview">
          <img 
            src={fiche9}
            alt={t('AppuiActeurs.lexique.preview.imageAlt')} 
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 9 word.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 9 word.pdf` }
              target="_blank"
              src={downloadimg} 
              alt={t('AppuiActeurs.lexique.preview.download.link')}  
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 9 word.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          {t('AppuiActeurs.fr.accederLexiqueFrancais')}
        </a>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/fiches/Fiche 9 grille Pratique pour les Journalistes pour le monitoring de l'Accessibilité des Services Numériques Publics_VAR.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
          style={{marginBottom:"3em"}}
        >
          {t('AppuiActeurs.fr.accederLexiqueArabe')}
        </a>
      </div>
    </div>
      </Container>
    </Container>
  );
};

export default AppuiActeurs;
