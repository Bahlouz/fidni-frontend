import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './CommPreview.css'; // Make sure to create this CSS file for custom styles

const CommPreview = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const articles = t('previewcomm.articles', { returnObjects: true }); // Get articles array

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
            src={`${process.env.PUBLIC_URL}${currentArticle.imageUrl}`}
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
                  key={index}
                  className={`comm-dot ${index === currentIndex ? "comm-active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <Card.Body className="card-body-comm">
          <Link to={currentArticle.link}>
            <Button variant="primary">{currentArticle.buttonText}</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommPreview;
