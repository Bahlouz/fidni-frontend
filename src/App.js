import React, { useEffect, useState } from 'react';
import './App.css';
import './style.css';
import './darkstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import NavBar from './Components/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer';
import Blog from './Components/Blog/Blog';
import Events from './Components/News_&_Events/Events/Events';
import News from './Components/News_&_Events/News/News'
import AudioPodcast from './Components/Ressources/MediaTech/AudioPodcast';

import Opportunities from './Components/For_You/Opportunities';
import AccessibilityFeatures from './Components/AccessibilityFeatures/AccessibilityFeatures';
import { ThemeProvider } from './Context/ThemeContext';
import Wikid from './Components/Wikid/Wikid';
import VideoPlayerList from './Components/Ressources/MediaTech/Video';
import Preloader from './Components/Preloader';
import { useTheme } from './Context/ThemeContext';
import SinglePost from './Components/Blog/SinglePost';
import SingleNews from './Components/News_&_Events/News/SingleNews';
import SingleWikidi from './Components/Wikid/SingleWikidi';

import SavoirLab from './Components/SavoirLab/SavoirLab';
import Services from './Components/For_You/Services';
import Droits from './Components/For_You/Droits';
import AccessibilityIcon from './Components/AccessibilitySettings/AccessibilitySettings';
import Convention from './Components/For_You/Convention';
import Accessibility from './Components/SavoirLab/Accessibility/Accessibility';
import Communication from './Components/SavoirLab/Communication/Communication';
import DocumentPl from './Components/SavoirLab/DocumentsPl/DocumentPl';
import ActeurScPl from './Components/Wikid/ActeurScPl';
import Artistes from './Components/Wikid/Artistes';
import Chercheurs from './Components/Wikid/Chercheurs';
import Sportifs from './Components/Wikid/Sportifs';
import Entrepreneurs from './Components/Wikid/Entrepreneurs';
import Cadre from './Components/For_You/Cadre';
import AccessMedia from './Components/SavoirLab/Accessibility/AccessMedia/AccessMedia';
import AppuiActeurs from './Components/SavoirLab/Accessibility/AppuiActeurs/AppuiActeurs';
import Guide from './Components/SavoirLab/Communication/Guide/Guide';
import Lexique from './Components/SavoirLab/Communication/Lexique/Lexique';
import Charte from './Components/SavoirLab/Communication/Charte/Charte';
import Recommandation from './Components/SavoirLab/Communication/Recommandation/Recommandation';
import Adoption from './Components/SavoirLab/Communication/Recommandation/Adoption/Adoption';
import Coalition from "./Components/SavoirLab/Communication/Charte/Coalition/Coalition";
import ContactUs from './Components/ContactUs';
import SingleEvents from './Components/News_&_Events/Events/SingleEvents';
import SingleDroits from './Components/For_You/SingleDroit';
import SingleAccessibility from './Components/SavoirLab/Accessibility/SingleAccessibility';
import SingleCharte from './Components/SavoirLab/Communication/Charte/SingleCharte';
import SingleRecommendation from './Components/SavoirLab/Communication/Recommandation/SingleRecommendation';


function App() {
  const { toggleTheme, theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
          fetch('/api/post-blogs?populate=*'),
          fetch('/api/categories?populate=*'),
          fetch('/api/subcategories?populate=*&filters[category][$null]=true')
        ]);
        const blogsData = await blogsResponse.json();
        const categoriesData = await categoriesResponse.json();
        const subcategoriesData = await subcategoriesResponse.json();

        // Perform any data handling if needed

        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`app ${theme}`}>
      {loading ? <Preloader /> : null}
        <Router>
          <AccessibilityIcon />
          <NavBar />
          <Routes>
          <Route path="/accessibility" Component={AccessibilityFeatures} />
          <Route path='/savoir-lab/wikiphedia' Component={Wikid} />
          <Route path="/savoir-lab/wikiphedia/acteurs-sociaux-politiques" Component={ActeurScPl} />
          <Route path="/savoir-lab/wikiphedia/artistes" Component={Artistes} />
          <Route path="/savoir-lab/wikiphedia/chercheurs" Component={Chercheurs} />
          <Route path="/savoir-lab/wikiphedia/entrepreneurs" Component={Entrepreneurs} />
          <Route path="/savoir-lab/wikiphedia/sportifs" Component={Sportifs} />
          <Route path="/savoir-lab/wikiphedia/:storyTitle" Component={SingleWikidi} />
          <Route path='/savoir-lab/savoir-lab' Component={SavoirLab} />
          <Route path='/savoir-lab/accessibilite' Component={Accessibility} />
          <Route
          path="/savoir-lab/accessibilite/:title"
          element={<SingleAccessibility />}
        />
          <Route path='/savoir-lab/Accessibilité aux médias et à l’information' Component={AccessMedia} />
          <Route path='/savoir-lab/Appui des acteurs médiatiques au processus d accessibilité' Component={AppuiActeurs} />
          <Route path='/savoir-lab/communication-inclusive' Component={Communication} />
          <Route path='/savoir-lab/communication-inclusive/charte-nationale/coalition' Component={Coalition} />
          <Route path='/contactez-nous' Component={ContactUs} />
          <Route path='/savoir-lab/communication-inclusive/guide' Component={Guide} />
          <Route path='/savoir-lab/communication-inclusive/lexique' Component={Lexique} />
          <Route path='/savoir-lab/communication-inclusive/charte-nationale' Component={Charte} />
          <Route path="/savoir-lab/communication-inclusive/charte-nationale/:title" element={<SingleCharte />} />
          <Route path='/savoir-lab/communication-inclusive/recommandations' Component={Recommandation} />
          <Route
          path="/savoir-lab/communication-inclusive/recommandations/:title"
          element={<SingleRecommendation />}
        />
          <Route path='/savoir-lab/recommandations/adoption' Component={Adoption} />
          <Route path='/savoir-lab/documents-de-plaidoyer' Component={DocumentPl} />
          <Route path='/services-et-droits/droits' Component={Droits} />
          <Route
          path="/services-et-droits/droits/:title"
          element={<SingleDroits />}
        />
          <Route path='/services-et-droits/services' Component={Services} />
          <Route path="/services-et-droits/convention" Component={Convention} />
          <Route path="/services-et-droits/cadre" Component={Cadre} />
          <Route path="/" Component={Home} />
          <Route path="/mediatheque/video" Component={VideoPlayerList} />
          <Route path="/mediatheque/audio-podcast" Component={AudioPodcast} />
          <Route path="/blog" Component={Blog} />
          <Route path="/blog/:postId" element={<SinglePost />} />
          <Route path="/post/:postId" Component={SinglePost} />
          <Route path="/actualites-et-evenements/actualites" Component={News} />
          <Route path="/actualites-et-evenements/actualites/:newsTitle" Component={SingleNews} />
          <Route path="/actualites-et-evenements/evenements" Component={Events} />
          <Route path="/actualites-et-evenements/evenements/:eventTitle" element={<SingleEvents />} />
          <Route path="/services-et-droits/opportunites" Component={Opportunities} />
          </Routes>
          <Footer />
        </Router>

    </div>
  );
}

export default App;
