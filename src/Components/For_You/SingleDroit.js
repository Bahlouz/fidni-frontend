import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SingleDroits = () => {
  const { title } = useParams(); // Extract the title from the URL parameters
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/post-blogs?populate[subcategory][populate]=*&filters[Title][$eq]=${title}`);
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
    <Container fluid className="droits-container">
      <div className="background-image-droits">
        <div className="p-5 overlay-text-droits">
          <h1 className="droits-titre">{post.attributes.Title}</h1>
        </div>
      </div>
      <Container className="p-5">
        <div
          className="droits-content"
          dangerouslySetInnerHTML={{ __html: post.attributes.content }}
        />
        <Button variant="secondary" href="/services-et-droits/droits">Retour à la liste</Button>
      </Container>
    </Container>
  );
};

export default SingleDroits;
