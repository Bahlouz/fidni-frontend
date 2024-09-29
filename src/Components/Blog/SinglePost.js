import React from 'react';
import { useParams } from 'react-router-dom';
import blogPosts from './blogPosts.jsx'; // Ensure correct path and file extension
import backnavhead from "../../Assets/back navhead.jpg";
import "./SinglePost.css";

const SinglePost = () => {
  const { postId } = useParams();
  const post = blogPosts.find(post => post.id === String(postId)); // Ensure correct comparison

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <img className="backnavhead" src={backnavhead} alt="Background" aria-hidden="true" />
      <div className="single-post-container">
        <h1 className="single-post-title">{post.title}</h1>
        <img src={post.image} alt={post.alt} className="single-post-image" />
        <p className="single-post-info">{post.date} | {post.postedBy}</p>
        <p className="single-post-body">{post.body}</p>
        {/* Add any other content or styling for the single post page */}
      </div>
    </>
  );
}

export default SinglePost;
