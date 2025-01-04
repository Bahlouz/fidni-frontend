import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import backnavhead from "../../Assets/back navhead.jpg";
import "./SinglePost.css";

const SinglePost = () => {
  const { postTitle } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = 'https://admin.fidni.tn';
  const decodedTitle = decodeURIComponent(postTitle);

  const fetchPost = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const response = await fetch(`${BASE_URL}/api/blogs?populate=*`);
      if (!response.ok) {
        throw new Error('Post not found');
      }
      const data = await response.json();
  
   
  
      // Check if the post exists
      if (data.data.length > 0) {
        const apiPost = data.data[0].attributes;
        const postData = {
          id: data.data[0].id,
          title: apiPost.titre || 'Untitled Post',
          createdAt: new Date(apiPost.createdAt).toLocaleDateString(),
          author: apiPost.nometprenom || 'Unknown',
          content: apiPost.content || [],
          // Extract the image URL from the 'thumbnail' format
          imageUrl: apiPost.files?.data?.[0]?.attributes?.url || '',
        };
        setPost(postData); // Set the post data
      } else {
        throw new Error('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };
  

  useEffect(() => {
    fetchPost();
  }, [postTitle]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Use a spinner here
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Fetching Post</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={fetchPost}>Retry</button>
      </div>
    ); // Enhanced error message with retry option
  }

  if (!post) {
    return <div>Post not found</div>; // Handle if post is not found
  }

  return (
    <>
      <img className="backnavhead" src={backnavhead} alt="Background" aria-hidden="true" />
      <div className="single-post-container">
        <h1 className="single-post-title">{post.title}</h1>
        {post.imageUrl ? (
          <img 
            src={`${BASE_URL}${post.imageUrl}`} 
            alt={post.title} 
            className="single-post-image" 
          />
        ) : (
          <div className="no-image-placeholder">No Image Available</div>
        )}
        <p className="single-post-info">
          {post.createdAt} | {post.author}
        </p>
        <div className="single-post-body">
          {post.content.length > 0 ? (
            post.content.map((paragraph, index) => (
              <p key={index}>{paragraph.children.map(child => child.text).join(' ')}</p>
            ))
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
