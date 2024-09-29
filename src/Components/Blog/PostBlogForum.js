import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostBlogForum = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control type="text" placeholder="Nom et Prénom" />
            </Form.Group>

            <Form.Group controlId="formDomain" className="mb-3">
              <Form.Control type="text" placeholder="Votre domaine d'expertise" />
            </Form.Group>

            <Form.Group controlId="formAge" className="mb-3">
              <Form.Control type="number" placeholder="Âge" />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Control type="text" placeholder="Titre" />
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Control as="textarea" rows={3} placeholder="Contenu" />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.File label="Choisir un fichier" />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Envoyer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostBlogForum;
