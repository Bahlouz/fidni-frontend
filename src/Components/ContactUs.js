import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import backnavhead from "../Assets/back navhead.jpg";

const ContactUs = () => {
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const BASE_URL = 'https://admin.fidni.tn';

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = e.target.formName.value;
    const email = e.target.formEmail.value;
    const organization = e.target.formOrganization.value;
    const subject = e.target.formSubject.value;
    const message = e.target.formMessage.value;
  
    const requestBody = {
      to: "support@fidni.tn",
      subject: subject,
      html: `<p>Nom et Prénom: ${name}</p>
             <p>Organisation/Individu: ${organization}</p>
             <p>Adresse Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
  
    const username = 'support@fidni.tn'; // Replace with your username
    const password = 'QKG6HwXGHN'; // Replace with your password
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    });
  
    try {
      const response = await fetch(`${BASE_URL}/api/email`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });
  
      // Handle the response
      if (response.ok) {
        setAlert({ show: true, message: 'Votre message a été envoyé avec succès!', variant: 'success' });
      } else {
        const errorData = await response.json();
        setAlert({ show: true, message: errorData.message || 'Erreur lors de l\'envoi du message.', variant: 'danger' });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setAlert({ show: true, message: 'Erreur lors de l\'envoi du message.', variant: 'danger' });
    }
  };
  
    


  return (
    <>
      <Row>
        <img className="backnavhead" src={backnavhead} alt="Background" />
      </Row>
      <Container fluid className="p-5 bg-light">
        {alert.show && (
          <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
            {alert.message}
          </Alert>
        )}
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h1 className="display-4">Contactez Nous</h1>
            <p className="lead">
              Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-4">
                <Form.Label>Nom & Prénom</Form.Label>
                <Form.Control type="text" name="formName" placeholder="Entrez votre nom et prénom" />
              </Form.Group>
              <Form.Group controlId="formOrganization" className="mb-4">
                <Form.Label>L'organisation/individu</Form.Label>
                <Form.Control type="text" name="formOrganization" placeholder="Entrez le nom de l'organisation ou de l'individu" />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control type="email" name="formEmail" placeholder="Entrez votre email" />
              </Form.Group>

              <Form.Group controlId="formSubject" className="mb-4">
                <Form.Label>Sujet</Form.Label>
                <Form.Control type="text" name="formSubject" placeholder="Entrez le sujet" />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-4">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" name="formMessage" rows={5} placeholder="Écrivez votre message ici..." />
              </Form.Group>

              <Button variant="primary" type="submit" size="lg" className="w-100">
                Envoyer
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUs;
