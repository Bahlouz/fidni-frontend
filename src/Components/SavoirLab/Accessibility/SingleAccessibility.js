import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Accessibility.css'; // Ensure this file includes styles for your component

const SingleAccessibility = () => {
  const { title } = useParams(); // Extract the title from the URL parameters
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post-blogs?populate[subcategory][populate]=*&filters[Title][$eq]=${title}`);
        const data = await response.json();
        const fetchedPosts = data.data; // Array of posts

        if (fetchedPosts.length > 0) {
          // Assuming we need to select the first post from the result
          const fetchedPost = fetchedPosts[0];
          setPost(fetchedPost);
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [title]);

  if (!post) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container fluid className="Accessibility-container">
      <div className="background-image-Accessibility">
        <div className="p-5 overlay-text-Accessibility">
          <h1 className="Accessibility-title">{post.attributes.Title}</h1>
        </div>
      </div>
      <Container className="p-5">
        <div
          className="Accessibility-content"
          dangerouslySetInnerHTML={{ __html: post.attributes.content }}
        />
        <Button variant="secondary" href="/savoir-lab/accessibilite">
          Retour à la liste
        </Button>
      </Container>
    </Container>
  );
};

export default SingleAccessibility;
