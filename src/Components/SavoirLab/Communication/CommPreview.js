import React, { useState, useEffect, useRef } from "react";
import { Card, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import './CommPreview.css'; // Make sure to create this CSS file for custom styles

const CommPreview = () => {
  // Define the images, titles, and links
  const articles = [
    { id: 1, imageUrl: `${process.env.PUBLIC_URL}/previewcomm/backcommunication.png`,  title: 'Le guide de bonnes pratiques éditoriales et éthiques', link: '/savoir-lab/communication-inclusive/guide'},
    { id: 2, imageUrl: `${process.env.PUBLIC_URL}/previewcomm/backcommunication1.png`, title: 'Le lexique de communication inclusive des personnes handicapées', link: '/savoir-lab/communication-inclusive/lexique' },
    { id: 3, imageUrl: `${process.env.PUBLIC_URL}/previewcomm/backcharte.jpg`,title: 'La charte nationale pour des médias inclusifs et accessibles aux personnes handicapées en Tunisie',link:'/savoir-lab/communication-inclusive/charte-nationale' },
    { id: 4, imageUrl: `${process.env.PUBLIC_URL}/previewcomm/rec3.png`, title: 'Les recommandations pour les médias et les acteurs médiatiques', link: '/savoir-lab/communication-inclusive/recommandations' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageTransitionClass, setImageTransitionClass] = useState("transition-scale");
  const intervalRef = useRef(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      handleArticleChange((prevIndex) => (prevIndex + 1) % articles.length);
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
  }, [articles.length]);

  const handleDotClick = (index) => {
    clearInterval(intervalRef.current); // Stop the current interval
    handleArticleChange(index); // Change the article and reset the zoom
    startInterval(); // Restart the interval
  };

  const currentArticle = articles[currentIndex]; // Get the current article

  return (
    <div className="comm-article-preview-container">
      <Card className="comm-article-card">
        <div className="comm-image-container">
          <Card.Img
            src={currentArticle.imageUrl}
            alt={currentArticle.title}
            className={`comm-article-image ${imageTransitionClass}`}
          />
          <div className="comm-overlay">
            <h2 className="comm-title">
              {currentArticle.title}
            </h2>
            <div className="comm-dots-section">
              {articles.map((article, index) => (
                <span
                  key={article.id}
                  className={`comm-dot ${index === currentIndex ? "comm-active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <Card.Body className="card-body-comm">
          <Link to={currentArticle.link}>
            <Button variant="primary">Lire plus</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommPreview;
