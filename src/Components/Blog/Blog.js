import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import blogPosts from './blogPosts'; // Local data for demo

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const BASE_URL = 'https://admin.fidni.tn';
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    nometprenom: '',
    domainexpertise: '',
    age: '',
    email: '',
    titre: '',
    content: '',
    files: [] // Add files to state
  });

  // Fetch existing posts from the API or fallback to local data
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/blogs?populate=*`);
      const data = await response.json();
  
      // Filter posts by 'approved' status before setting state
      const approvedPosts = data.data.filter(post => post.attributes.approved === true);
  
      // Update the state with only the approved posts
      setPosts(approvedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      setFormData((prev) => ({ ...prev, files: Array.from(files) })); // Handle file uploads
    } else {
      setFormData((prev) => ({ ...prev, [name]: value })); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the post data without the files
    const postToSend = {
      data: {
        nometprenom: formData.nometprenom,
        domainexpertise: formData.domainexpertise,
        age: Number(formData.age),
        email: formData.email,
        titre: formData.titre,
        content: [
          {
            type: "paragraph",
            children: [
              {
                text: formData.content,
                type: "text",
              },
            ],
          },
        ],
        approved: false,
      },
    };
  
    // Use FormData to send both post data and files
    const formDataToSend = new FormData();
    
    // Append JSON data as string
    formDataToSend.append("data", JSON.stringify(postToSend.data));
  
    // Append each file in the 'files' array
    formData.files.forEach((file) => {
      formDataToSend.append("files.file", file);  // 'files.file' depends on the API's expected field name
    });
  
    try {
      const response = await fetch(`${BASE_URL}/api/blogs?populate=*`, {
        method: 'POST',
        body: formDataToSend, // Send FormData
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Post submitted successfully:', data);
        setShow(false); // Close modal after successful submission
        setFormData({
          nometprenom: '',
          domainexpertise: '',
          age: '',
          email: '',
          titre: '',
          content: '',
          files: []
        });
        fetchPosts(); // Refresh posts without additional fetch
      } else {
        console.error('Error submitting post:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <>
      <div className="background-image-blog">
        <div className="overlay-text-blog-singlepage">
          <h1 className="p-5 blog-titre-singlepage">Blog</h1>
          <Button variant="primary" onClick={handleShow} className="my-4">
            Ajouter un post
          </Button>
        </div>
      </div>
      <div className="background-image-blog-two">
        <div className="blog-container-unique">
          <h2 className="all-posts-title-unique">All Posts</h2>
          <div className="all-posts-grid-unique">
            {posts.map((post) => (
              <Card key={post.attributes.titre} className="post-unique">
                {post.attributes.file?.data?.[0]?.attributes?.formats?.large?.url ? (
                  <Card.Img className="post-image-unique" variant="top" src={`${BASE_URL}${post.attributes.file.data[0].attributes.formats.large.url}`} />
                ) : post.attributes.file?.data?.[0]?.attributes?.formats?.thumbnail?.url ? (
                  <Card.Img className="post-image-unique" variant="top" src={`${BASE_URL}${post.attributes.file.data[0].attributes.formats.thumbnail.url}`}/>
                ) : (
                  <div className="no-image-placeholder">No Image</div>
                )}
                <Card.Body className="post-content-unique">
                  <Link to={`/blog/${post.attributes.titre}`} className="post-link">
                    <Card.Title className="post-title-unique">{post.attributes.titre || "Untitled Post"}</Card.Title>
                  </Link>
                  <Card.Text>
                    {post.attributes.content && post.attributes.content.length > 0 ? (
                      post.attributes.content.map((paragraph, index) => (
                        <p key={index}>
                          {paragraph.children.map((child) => child.text).join(' ')}
                        </p>
                      ))
                    ) : (
                      <p>No content available</p>
                    )}
                  </Card.Text>
                  <Card.Footer>
                    <small className="text-muted">
                      {post.attributes.createdAt
                        ? new Date(post.attributes.createdAt).toLocaleDateString()
                        : "Unknown Date"}
                    </small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Adding a Post */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                name="nometprenom"
                placeholder="Nom et Prénom"
                value={formData.nometprenom}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDomain" className="mb-3">
              <Form.Control
                type="text"
                name="domainexpertise"
                placeholder="Votre domaine d'expertise"
                value={formData.domainexpertise}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge" className="mb-3">
              <Form.Control
                type="number"
                name="age"
                placeholder="Âge"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Control
                type="text"
                name="titre"
                placeholder="Titre de post"
                value={formData.titre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Control
                as="textarea"
                name="content"
                placeholder="Écrire le post"
                rows={5}
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Télécharger un fichier</Form.Label>
              <Form.Control
                type="file"
                name="files"
                multiple // Allow multiple file uploads
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Soumettre le post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Blog;
