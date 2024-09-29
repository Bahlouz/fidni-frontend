import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [mediaUploads, setMediaUploads] = useState([]);
  const [postBlogs, setPostBlogs] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showMediaUploadForm, setShowMediaUploadForm] = useState(false);
  const [showPostBlogForm, setShowPostBlogForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);

  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newMediaUpload, setNewMediaUpload] = useState({ title: '', mediafile: null });
  const [newPostBlog, setNewPostBlog] = useState({ title: '', content: '', slug: '' });
  const [newSubCategory, setNewSubCategory] = useState({ name: '', categoryId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoriesResponse = await axios.get('/api/categories');
      const subCategoriesResponse = await axios.get('/api/sub-categories');
      const mediaUploadsResponse = await axios.get('/api/media-uploads');
      const postBlogsResponse = await axios.get('/api/post-blogs');


      setCategories(categoriesResponse.data);
      setMediaUploads(mediaUploadsResponse.data);
      setPostBlogs(postBlogsResponse.data);
      setSubCategories(subCategoriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteMediaUpload = async (id) => {
    try {
      await axios.delete(`/api/media-uploads/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting media upload:', error);
    }
  };

  const handleDeletePostBlog = async (id) => {
    try {
      await axios.delete(`/api/post-blogs/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting post blog:', error);
    }
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      await axios.delete(`/api/sub-categories/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting sub-category:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post('/api/categories', newCategory);
      setNewCategory({ name: '' });
      setShowCategoryForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddMediaUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newMediaUpload.title);
      formData.append('mediafile', newMediaUpload.mediafile);

      await axios.post('/api/media-uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewMediaUpload({ title: '', mediafile: null });
      setShowMediaUploadForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding media upload:', error);
    }
  };

  const handleAddPostBlog = async () => {
    try {
      await axios.post('/api/post-blogs', newPostBlog);
      setNewPostBlog({ title: '', content: '', slug: '' });
      setShowPostBlogForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding post blog:', error);
    }
  };

  const handleAddSubCategory = async () => {
    try {
      await axios.post('/api/sub-categories', newSubCategory);
      setNewSubCategory({ name: '', categoryId: '' });
      setShowSubCategoryForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding sub-category:', error);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h2>Admin Dashboard</h2>
        </Col>
      </Row>

      {/* Categories */}
      <Row className="mt-4">
        <Col>
          <h3>Categories</h3>
          <Button variant="primary" onClick={() => setShowCategoryForm(true)} className="me-2">
            Add New Category
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <Button variant="info" className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Category Modal */}
      <Modal show={showCategoryForm} onHide={() => setShowCategoryForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCategoryForm(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Save Category
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Media Uploads */}
      <Row className="mt-4">
        <Col>
          <h3>Media Uploads</h3>
          <Button variant="primary" onClick={() => setShowMediaUploadForm(true)} className="me-2">
            Add New Media Upload
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaUploads.map((mediaUpload) => (
                <tr key={mediaUpload.id}>
                  <td>{mediaUpload.id}</td>
                  <td>{mediaUpload.title}</td>
                  <td>
                    <Button variant="info" className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteMediaUpload(mediaUpload.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Media Upload Modal */}
      <Modal show={showMediaUploadForm} onHide={() => setShowMediaUploadForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Media Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMediaUploadTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newMediaUpload.title}
                onChange={(e) => setNewMediaUpload({ ...newMediaUpload, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formMediaUploadFile">
              <Form.Label>Media File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setNewMediaUpload({ ...newMediaUpload, mediafile: e.target.files[0] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMediaUploadForm(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddMediaUpload}>
            Save Media Upload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post Blogs */}
      <Row className="mt-4">
        <Col>
          <h3>Post Blogs</h3>
          <Button variant="primary" onClick={() => setShowPostBlogForm(true)} className="me-2">
            Add New Post Blog
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postBlogs.map((postBlog) => (
                <tr key={postBlog.id}>
                  <td>{postBlog.id}</td>
                  <td>{postBlog.title}</td>
                  <td>{postBlog.content}</td>
                  <td>
                    <Button variant="info" className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeletePostBlog(postBlog.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Post Blog Modal */}
      <Modal show={showPostBlogForm} onHide={() => setShowPostBlogForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Post Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPostBlogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newPostBlog.title}
                onChange={(e) => setNewPostBlog({ ...newPostBlog, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPostBlogContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={newPostBlog.content}
                onChange={(e) => setNewPostBlog({ ...newPostBlog, content: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPostBlogForm(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPostBlog}>
            Save Post Blog
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sub Categories */}
      <Row className="mt-4">
        <Col>
          <h3>Sub Categories</h3>
          <Button variant="primary" onClick={() => setShowSubCategoryForm(true)} className="me-2">
            Add New Sub Category
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subCategory) => (
                <tr key={subCategory.id}>
                  <td>{subCategory.id}</td>
                  <td>{subCategory.name}</td>
                  <td>{subCategory.categoryId}</td>
                  <td>
                    <Button variant="info" className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteSubCategory(subCategory.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Sub Category Modal */}
      <Modal show={showSubCategoryForm} onHide={() => setShowSubCategoryForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSubCategoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newSubCategory.name}
                onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formSubCategoryCategory">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category ID"
                value={newSubCategory.categoryId}
                onChange={(e) => setNewSubCategory({ ...newSubCategory, categoryId: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSubCategoryForm(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubCategory}>
            Save Sub Category
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
