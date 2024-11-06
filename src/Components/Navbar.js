import React, { useState, useEffect ,useRef} from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.svg";
import { NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { useTheme } from '../Context/ThemeContext';
import useCategoriesAndSubCategories from "./usefetch";
import Header from "./Header";
import { ActeurScPlitems } from './Wikid/ActeurScPlitems';
import { Artistesitems } from './Wikid/Artistesitems';
import { Chercheursitems } from './Wikid/Chercheursitems';
import { Entrepreneursitems } from './Wikid/Entrepreneursitems';
import { Sportifsitems } from './Wikid/Sportifsitems';
import {cardData as droitsdata } from './For_You/Droits';
import {cardData as servicesdata} from './For_You/Services';
import { eventsitems } from "./News_&_Events/Events/eventsitems";
import { newsItems } from "./News_&_Events/News/newsItems";
import {volunteerOpportunities} from "./For_You/Opportunities";
import {cardData as chartedata} from "./SavoirLab/Communication/Charte/Charte";
import {cardData as recommandtaionsdata} from "./SavoirLab/Communication/Recommandation/Recommandation";
import {pdfList} from "./SavoirLab/DocumentsPl/DocumentPl";
import { useTranslation } from 'react-i18next';

// Define your manual links here


  // Define your manual links here, utilizing the translation keys
  

function NavBar() {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const arabicNavItems = [
    {
      title: 'الرئيسية',
      to: '/'
    },
    {
      title: 'الخدمات والحقوق',
      subcategories: [
        { title: 'الخدمات', to: '/services-et-droits/services' },
        { title: 'الحقوق', to: '/services-et-droits/droits' },
        { title: 'فرص التطوع', to: '/services-et-droits/opportunites' }
      ]
    },
    {
      title: 'مختبر المعرفة',
      subcategories: [
        { title: 'الوصول', to: '/savoir-lab/accessibilite' },
        { title: 'الاتصال الشامل', to: '/savoir-lab/communication-inclusive' },
        { title: 'ويكيبيديا', to: '/savoir-lab/wikiphedia' },
        { title: 'وثائق المناصرة', to: '/savoir-lab/documents-de-plaidoyer' }
      ]
    },
    {
      title: 'الأخبار والفعاليات',
      subcategories: [
        { title: 'الأخبار', to: '/actualites-et-evenements/actualites' },
        { title: 'الفعاليات', to: '/actualites-et-evenements/evenements' }
      ]
    },
    {
      title: 'المكتبة الإعلامية',
      subcategories: [
        { title: 'الصوتيات والبودكاست', to: '/mediatheque/audio-podcast' },
        { title: 'الفيديو', to: '/mediatheque/video' }
      ]
    },
    {
      title: 'المدونة',
      to: '/blog'
    }
  ];
  
  const manualLinks = [
    {
      title: 'Accueil',
      to: "/"
    },
    {
      title: 'Services et Droits',
      subcategories: [
        { title: 'Services', to: "/services-et-droits/services" },
        { title: t('navigation.rights'), to: "/services-et-droits/droits" },
        { title: t('navigation.opportunities'), to: "/services-et-droits/opportunites" }
      ]
    },
    {
      title: t('navigation.savoir_lab'),
      subcategories: [
        { title: t('navigation.accessibility'), to: "/savoir-lab/accessibilite" },
        { title: t('navigation.inclusive_communication'), to: "/savoir-lab/communication-inclusive" },
        { title: t('navigation.wikipedia'), to: "/savoir-lab/wikiphedia" },
        { title: t('navigation.advocacy_documents'), to: "/savoir-lab/documents-de-plaidoyer" }
      ]
    },
    {
      title: t('navigation.news_and_events'),
      subcategories: [
        { title: t('navigation.news'), to: "/actualites-et-evenements/actualites" },
        { title: t('navigation.events'), to: "/actualites-et-evenements/evenements" }
      ]
    },
    {
      title: t('navigation.media_library'),
      subcategories: [
        { title: t('navigation.audio_and_podcast'), to: "/mediatheque/audio-podcast" },
        { title: t('navigation.video'), to: "/mediatheque/video" }
      ]
    },
    {
      title: t('navigation.blog'),
      to: "/blog"
    }
  ];
  
  
  const [expand, updateExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { toggleTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { loading, error, categories = [], subcategoriesNoCategory = [] } = useCategoriesAndSubCategories();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const BASE_URL = 'https://admin.fidni.tn';

  const getSubcategoryLink = (subcategoryName) => {
    for (const link of manualLinks) {
      if (link.subcategories) {
        const subLink = link.subcategories.find(sub => sub.title === subcategoryName);
        if (subLink) {
          return subLink.to; // Return the corresponding path for the subcategory
        }
      }
    }
    return null; // Return null if not found
  };
  
  
  const formatTitleForURL = (title) => {
    return encodeURIComponent(title); // Encode the title for URL (spaces become %20, etc.)
  };
  
  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    try {
      let apiSuggestions = [];
      if (query.trim() !== '') {
        // Fetch from API
        const response = await axios.get(`${BASE_URL}/api/post-blogs?populate=*`);
        const blogPosts = response.data.data;
  
        // Filter blog posts by title
        const filteredPosts = blogPosts.filter(post =>
          post.attributes.Title.toLowerCase().includes(query.toLowerCase())
        );
  
        apiSuggestions = filteredPosts.map(post => {
          const subcategory = post.attributes.subcategory?.data?.attributes?.name || 'No Subcategory';
          const subLink = getSubcategoryLink(subcategory);
          const formattedTitle = formatTitleForURL(post.attributes.Title);
  
          return {
            title: post.attributes.Title,
            subcategory: subcategory,
            link: `${subLink}/${formattedTitle}`
          };
        });
      }
  
      // Search in static data
      const staticSuggestions = [
        ...ActeurScPlitems,
        ...Artistesitems,
        ...Chercheursitems,
        ...Entrepreneursitems,
        ...Sportifsitems,
        ...droitsdata,
        ...servicesdata,
        ...eventsitems,
        ...newsItems,
        ...volunteerOpportunities,
        ...chartedata,
        ...recommandtaionsdata,
        ...pdfList
      ]
        .filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map(item => ({
          title: item.title,
          subcategory: item.subcategory || 'Static Data',
          link: item.link || '#' // Update with actual link logic if available
        }));
  
      // Combine API and static data suggestions
      const combinedSuggestions = [...staticSuggestions, ...apiSuggestions];
  
      setSuggestions(combinedSuggestions);
      setSearchOpen(true);
    } catch (error) {
      setSuggestions([]);
    }
  };
  
  

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchOpen(false);
    setSuggestions([]);
  };
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  // Handle click outside to close the search bar
  const handleClickOutside = (event) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target) && !event.target.closest('.search-container')) {
      setSearchOpen(false);
    }
  };


  const handleSuggestionClick = (link) => {
    window.location.href = link; // Navigate to the blog post
    setSearchQuery("");
    setSuggestions([]);
    setSearchOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Function to get manual link for a category or subcategory
  const getManualLink = (name) => {
    for (const link of manualLinks) {
      // Check if the category title matches the name
      if (link.title === name) {
        return link.to; // Return the 'to' property if a top-level match is found
      }
      // Check if there are subcategories and search within them
      if (link.subcategories) {
        const subLink = link.subcategories.find(sub => sub.title === name);
        if (subLink) {
          return subLink.to; // Return the 'to' property of the matched subcategory
        }
      }
    }
    return null; // Return null if no match is found
  };
  

  // Map fetched categories and subcategories to manual links
  const mappedCategories = manualLinks.map((categoryLink) => {
    const categoryTitle = categoryLink.title; // Access the category title
    const categoryFromFetchedData = categories.find(category => category.name === categoryTitle);
  
    if (!categoryFromFetchedData) {
      return null; // Skip categories that are not found in the fetched data
    }
  
    // Initialize the mapped category
    const mappedCategory = {
      title: categoryTitle,
      to: categoryLink.to || null, // Direct link for top-level categories, or null if it doesn't exist
      subcategories: []
    };
  
    if (categoryLink.subcategories) {
      // If there are subcategories, map them
      mappedCategory.subcategories = categoryLink.subcategories.map(subcat => ({
        to: subcat.to, // Use the manual link here
        title: subcat.title, // Use the title for the label
      }));
    }
  
    return mappedCategory;
  }).filter(category => category !== null); // Filter out null categories
   // Remove any null values from the array

  // Add subcategories with no corresponding category as top-level categories
  const additionalCategories = subcategoriesNoCategory
    .map(subcategory => ({
      title: subcategory.name,
      subcateogories: [], // Assuming these subcategories don't have subcategories
      to: getManualLink(subcategory.name) // Add manual link for these subcategories
    }))
    .filter(cat => cat.to !== null); // Ensure they have a manual link

  const finalCategories = [...mappedCategories, ...additionalCategories];
  const navItems = i18n.language === 'fr' ? finalCategories : arabicNavItems;
  return (
    <div className="navigation">
    <Header />
    <Navbar 
      expanded={expand}
      fixed="top"
      expand="lg"
      id="navbar"
      className={`${isScrolled ? 'scrolled' : 'visible'}`}
      aria-label="Navigation principale"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex m-0 p-1">
          <img src={logo} className="img-fluid logo" alt="Fidni logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
          aria-label="Basculer la navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto" defaultActiveKey="#home" >
  {navItems && navItems.length > 0 && navItems.map((menu, index) => (
    menu.subcategories && menu.subcategories.length > 0 ? (
      <NavDropdown
        key={index}
        title={menu.title}
        id={`nav-dropdown-${index}`}
        className="navbar-item"
      >
        {menu.subcategories.map((item, idx) => (
          <NavDropdown.Item
          style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
            as={Link}
            to={item.to}
            key={idx}
            className="dropdown-item"
          >
            {item.title} {/* Ensure to use item.title */}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    ) : (
      <Nav.Link
        as={Link}
        to={menu.to}
        key={index}
        className="navbar-item"
      >
        {menu.title} {/* Ensure to use menu.title */}
      </Nav.Link>
    )
  ))}




            <Nav.Item>
              <Nav.Link onClick={handleSearchToggle}>
                <AiOutlineSearch />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      {searchOpen && (
        <div className={`search-container ${searchOpen ? 'open' : ''}`}>
          <Form onSubmit={handleSearchSubmit} className="d-flex">
            <FormControl
              type="search"
              placeholder={t('searchplaceholder')}
              className="me-2 search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              ref={searchInputRef} // Attach ref here
            />
            <Button variant="outline-success" type="submit">{t('search')}</Button>
          </Form>
          {suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion.link)}>
                {suggestion.title} <span className="subcategory">{suggestion.subcategory}</span>
              </li>
            ))}

            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
