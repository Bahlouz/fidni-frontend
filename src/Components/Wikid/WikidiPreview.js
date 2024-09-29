import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ActeurScPlitems } from './ActeurScPlitems';
import { Artistesitems } from './Artistesitems';
import { Chercheursitems } from './Chercheursitems';
import { Entrepreneursitems } from './Entrepreneursitems';
import { Sportifsitems } from './Sportifsitems';
import './WikidiPreview.css';

const WikidiPreview = () => {
  const categories = [
    { name: 'ActeurScPl', items: ActeurScPlitems },
    { name: 'Artistes', items: Artistesitems },
    { name: 'Chercheurs', items: Chercheursitems },
    { name: 'Entrepreneurs', items: Entrepreneursitems },
    { name: 'Sportifs', items: Sportifsitems },
  ];

  const getLastArticleFromCategory = (category) => {
    return category.items.reduce((prev, current) => (prev.id > current.id) ? prev : current);
  };

  const latestArticles = categories.map(category => getLastArticleFromCategory(category));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageTransitionClass, setImageTransitionClass] = useState("transition-scale");
  const intervalRef = useRef(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      handleArticleChange((prevIndex) => (prevIndex + 1) % latestArticles.length);
    }, 6000);
  };

  const handleArticleChange = (index) => {
    setImageTransitionClass(""); // Remove the class to reset the zoom
    setCurrentIndex(index); // Change the article

    // Reapply the transition class after a brief delay to trigger the zoom effect from the start
    setTimeout(() => {
      setImageTransitionClass("transition-scale");
    }, 10);
  };

  useEffect(() => {
    startInterval(); // Start the interval when the component mounts

    return () => clearInterval(intervalRef.current); // Clear the interval when the component unmounts
  }, [latestArticles.length]);

  const handleDotClick = (index) => {
    clearInterval(intervalRef.current); // Stop the current interval
    handleArticleChange(index); // Change the article and reset the zoom
    startInterval(); // Restart the interval
  };

  const currentArticle = latestArticles[currentIndex]; // Get the current article

  // Function to format description content
  const formatDescription = (content) => {
    // Replace <b> tags with <strong> tags for better semantics and replace <br /> with line breaks
    return content
      .replace(/<b>/g, '<strong>')
      .replace(/<\/b>/g, '</strong>')
      .replace(/<br\s*\/?>/g, '<br />');
  };

  return (
    <div className="wikidi-article-preview-container">
      <Card className="wikidi-article-card">
        <div className="wikidi-image-container">
          <Card.Img
            src={currentArticle.imageUrl}
            alt={currentArticle.title}
            className={`wikidi-article-image ${imageTransitionClass}`}
          />
          <div className="wikidi-overlay">
            <h2 className="wikidi-title">
              {currentArticle.title}
            </h2>
            <div className="wikidi-dots-section">
              {latestArticles.map((article, index) => (
                <span
                  key={article.id}
                  className={`wikidi-dot ${index === currentIndex ? "wikidi-active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <Card.Body className="card-body-wikiphedia">
          <Card.Title>{currentArticle.title}</Card.Title>
          {/* Format the content before displaying it and truncate to a single line */}
          <Card.Text 
            className="single-line-content" 
            dangerouslySetInnerHTML={{ __html: formatDescription(currentArticle.content) }} 
          />
          <Card.Text>
            <small className="text-muted">{currentArticle.date}</small>
          </Card.Text>
          <Link to={`/savoir-lab/wikiphedia/${currentArticle.title}`}>
            <Button variant="primary">Lire plus</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WikidiPreview;
