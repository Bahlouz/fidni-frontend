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
import { staticEvents } from "./News_&_Events/Events/Events";
import { newsItems } from "./News_&_Events/News/newsItems";
import {volunteerOpportunities} from "./For_You/Opportunities";
import {cardData as chartedata} from "./SavoirLab/Communication/Charte/Charte";
import {cardData as recommandtaionsdata} from "./SavoirLab/Communication/Recommandation/Recommandation";
import {pdfList} from "./SavoirLab/DocumentsPl/DocumentPl";
// Define your manual links here
const manualLinks = {
  "Acceuil": "/",
  "Services et Droits": {
    "Services": "/services-et-droits/services",
    "Droits": "/services-et-droits/droits",
    "Opportunités": "/services-et-droits/opportunites"
  },
  "Savoir Lab": {
    "Accessibilité": "/savoir-lab/accessibilite",
    "Communication inclusive": "/savoir-lab/communication-inclusive",
    "WikiPhédia": "/savoir-lab/wikiphedia",
    "Documents de plaidoyer": "/savoir-lab/documents-de-plaidoyer"
  },
  "Actualités et Événements": {
    "Actualités": "/actualites-et-evenements/actualites",
    "Événements": "/actualites-et-evenements/evenements"
  },
  "Médiathèque": {
    "Audio & Podcast": "/mediatheque/audio-podcast",
    "Vidéo": "/mediatheque/video"
  },
  "Blog": "/blog"
};

function NavBar() {
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
    for (const [category, links] of Object.entries(manualLinks)) {
      if (typeof links === 'object') {
        const subLink = links[subcategoryName];
        if (subLink) {
          return subLink; // Return the corresponding path for the subcategory
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
        ...staticEvents,
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
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };
  
  

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search submitted:", searchQuery);
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
    for (const [category, link] of Object.entries(manualLinks)) {
      if (typeof link === 'string' && category === name) {
        return link;
      }
      if (typeof link === 'object') {
        const subLink = link[name];
        if (subLink) {
          return subLink;
        }
      }
    }
    return null;
  };

  // Map fetched categories and subcategories to manual links
  const mappedCategories = Object.keys(manualLinks).map((categoryTitle) => {
    const categoryLink = manualLinks[categoryTitle];
    const categoryFromFetchedData = categories.find(category => category.name === categoryTitle);

    if (!categoryFromFetchedData) {
      return null; // Skip categories that are not found in the fetched data
    }

    if (typeof categoryLink === 'string') {
      // This is a main category with no subcategories
      return {
        title: categoryTitle,
        to: categoryLink, // Direct link for top-level categories
        items: []
      };
    }

    return {
      title: categoryTitle,
      items: Object.keys(categoryLink).map(subcat => ({
        to: categoryLink[subcat], // Use the manual link here
        label: subcat,
      }))
    };
  }).filter(category => category !== null); // Remove any null values from the array

  // Add subcategories with no corresponding category as top-level categories
  const additionalCategories = subcategoriesNoCategory
    .map(subcategory => ({
      title: subcategory.name,
      items: [], // Assuming these subcategories don't have subcategories
      to: getManualLink(subcategory.name) // Add manual link for these subcategories
    }))
    .filter(cat => cat.to !== null); // Ensure they have a manual link

  const finalCategories = [...mappedCategories, ...additionalCategories];

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
            <Nav className="ms-auto" defaultActiveKey="#home">
              {finalCategories && finalCategories.length > 0 && finalCategories.map((menu, index) => (
                menu.items.length > 0 ? (
                  <NavDropdown
                    key={index}
                    title={menu.title}
                    id={`nav-dropdown-${index}`}
                    className="navbar-item"
                  >
                    {menu.items.map((item, idx) => (
                      <NavDropdown.Item
                        as={Link}
                        to={item.to}
                        key={idx}
                        className="dropdown-item"
                      >
                        {item.label}
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
                    {menu.title}
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
              placeholder="Search"
              className="me-2 search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              ref={searchInputRef} // Attach ref here
            />
            <Button variant="outline-success" type="submit">Search</Button>
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
