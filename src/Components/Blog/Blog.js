import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import blogPosts from './blogPosts'; // Local data for demo
import { useTranslation } from 'react-i18next';
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { t ,i18n} = useTranslation(); 
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const BASE_URL = 'http://localhost:1338';
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
        <div className="overlay-text-blog-singlepage" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="p-5 blog-titre-singlepage" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('blog.title')}</h1>
          <Button  variant="primary" onClick={handleShow} className="my-4">
            {t('blog.addPost')}
          </Button>
        </div>
      </div>
      <div className="background-image-blog-two">
        <div className="blog-container-unique">
          <h2 className="all-posts-title-unique">{t('blog.allPosts')}</h2>
          <div className="all-posts-grid-unique">
            {posts.map((post) => (
              <Card key={post.attributes.titre} className="post-unique">
                {post.attributes.files?.data?.[0]?.attributes?.formats?.large?.url ? (
                  <Card.Img className="post-image-unique" variant="top" src={`${BASE_URL}${post.attributes.files.data[0].attributes.formats.large.url}`} />
                ) : post.attributes.files?.data?.[0]?.attributes?.formats?.thumbnail?.url ? (
                  <Card.Img className="post-image-unique" variant="top" src={`${BASE_URL}${post.attributes.files.data[0].attributes.formats.thumbnail.url}`}/>
                ) : (
                  <div className="no-image-placeholder">{t('blog.noImage')}</div>
                )}
                <Card.Body className="post-content-unique">
                  <Link to={`/blog/${encodeURIComponent(post.attributes.titre)}`} className="post-link">
                    <Card.Title className="post-title-unique">{post.attributes.titre || t('blog.postLink')}</Card.Title>
                  </Link>
                  <Card.Text>
                    {post.attributes.content && post.attributes.content.length > 0 ? (
                      post.attributes.content.map((paragraph, index) => (
                        <p key={index}>
                          {paragraph.children.map((child) => child.text).join(' ')}
                        </p>
                      ))
                    ) : (
                      <p>{t('blog.noContent')}</p>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Adding Posts */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('blog.modal.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>{t('blog.modal.name')}</Form.Label>
              <Form.Control type="text" name="nometprenom" value={formData.nometprenom} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formDomain">
              <Form.Label>{t('blog.modal.domain')}</Form.Label>
              <Form.Control type="text" name="domainexpertise" value={formData.domainexpertise} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>{t('blog.modal.age')}</Form.Label>
              <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>{t('blog.modal.email')}</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPostTitle">
              <Form.Label>{t('blog.modal.postTitle')}</Form.Label>
              <Form.Control type="text" name="titre" value={formData.titre} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>{t('blog.modal.content')}</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={formData.content} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Label>{t('blog.modal.uploadFile')}</Form.Label>
              <Form.Control type="file" name="files" multiple onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t('blog.modal.submit')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Blog;