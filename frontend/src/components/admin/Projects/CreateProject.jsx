import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { API_URL } from "../../../config";
import "./createproject.css";
const CreateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    website: "",
    github: "",
    overview: "",
    challenges: [{ title: "", challenge: "", solution: "" }],
    results: "",
    tags: "",
    mainImage: null,
    images: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.index !== undefined) {
      const updatedChallenges = [...formData.challenges];
      updatedChallenges[dataset.index][name] = value;
      setFormData({ ...formData, challenges: updatedChallenges });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "mainImage" ? files[0] : Array.from(files),
    }));
  };

  const handleAddChallenge = () => {
    setFormData((prevData) => ({
      ...prevData,
      challenges: [
        ...prevData.challenges,
        { title: "", challenge: "", solution: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (key === "challenges") {
        formData.challenges.forEach((ch, i) => {
          form.append(`challenges[${i}][title]`, ch.title);
          form.append(`challenges[${i}][challenge]`, ch.challenge);
          form.append(`challenges[${i}][solution]`, ch.solution);
        });
      } else if (key === "images") {
        formData.images.forEach((img, i) => {
          form.append(`images[${i}]`, img);
        });
      } else if (key === "mainImage") {
        form.append("mainImage", formData.mainImage);
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      await axios.post(`${API_URL}/projects/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Project added successfully!");
      navigate("/projects");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to add project");
    }
  };

  return (
    <Container className="my-5">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4 justify-content-between">
          <Col>
            <h3>Add a New Project</h3>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" className="me-2">
              Discard
            </Button>
            <Button variant="outline-primary" className="me-2">
              Save Draft
            </Button>
            <Button type="submit" variant="primary">
              Publish Project
            </Button>
          </Col>
        </Row>

        <Card className="mb-4">
          <Card.Header>
            <strong>Project Information</strong>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Client</Form.Label>
                  <Form.Control
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Overview</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="overview"
                value={formData.overview}
                onChange={handleChange}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header>
            <strong>Challenges</strong>
          </Card.Header>
          <Card.Body>
            {formData.challenges.map((item, index) => (
              <div key={index} className="border p-3 mb-3 rounded">
                <Form.Group className="mb-2">
                  <Form.Label>Challenge Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={item.title}
                    data-index={index}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Challenge</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="challenge"
                    value={item.challenge}
                    data-index={index}
                    onChange={handleChange}
                    rows={2}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Solution</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="solution"
                    value={item.solution}
                    data-index={index}
                    onChange={handleChange}
                    rows={2}
                  />
                </Form.Group>
              </div>
            ))}
            <Button variant="outline-success" onClick={handleAddChallenge}>
              + Add Challenge
            </Button>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header>
            <strong>Media Uploads</strong>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Main Image</Form.Label>
              <Form.Control
                type="file"
                name="mainImage"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Images</Form.Label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        <Form.Group className="mb-4">
          <Form.Label>Results</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="results"
            value={formData.results}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          Submit Project
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProject;
