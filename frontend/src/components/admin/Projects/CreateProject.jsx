import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { API_URL } from "../../../config";
import "./createproject.css";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { _id } = useParams(); // Use _id from URL for editing
  const isEditMode = !!_id; // Determine if in edit mode

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    client: "",
    website: "",
    ghLink: "",
    overview: "",
    services: "",
    mainImage: null,
    images: [],
    challenges: [{ title: "", challenge: "", solution: "" }],
    results: "",
    tags: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch project data if in edit mode
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`${API_URL}/projects/${_id}`);
          const project = response.data;
          setFormData({
            ...project,
            mainImage: null, // Reset file inputs
            images: [], // Reset file inputs
            challenges: project.challenges || [
              { title: "", challenge: "", solution: "" },
            ],
            tags: project.tags ? project.tags.join(", ") : "", // Convert tags array to comma-separated string
          });
        } catch (err) {
          console.error("Fetch error:", err);
          alert("Failed to load project data");
        }
      };
      fetchProject();
    }
  }, [_id, isEditMode]);

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
      } else if (key === "mainImage" && formData.mainImage) {
        form.append("mainImage", formData.mainImage);
      } else if (key === "tags") {
        // Convert comma-separated tags to array
        const tagsArray = formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        tagsArray.forEach((tag, i) => {
          form.append(`tags[${i}]`, tag);
        });
      } else if (key !== "mainImage" && key !== "images") {
        form.append(key, formData[key]);
      }
    }

    try {
      if (isEditMode) {
        // Update project
        await axios.put(`${API_URL}/projects/${_id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project updated successfully!");
      } else {
        // Create project
        await axios.post(`${API_URL}/projects/`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project added successfully!");
      }
      navigate("/projects");
    } catch (err) {
      console.error("Submit error:", err);
      alert(`Failed to ${isEditMode ? "update" : "add"} project`);
    }
  };

  return (
    <Container className="my-5 json-container">
      <div className="json-header">
        <h3>{isEditMode ? "Update Project" : "Create New Project"}</h3>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => navigate("/projects")}
          >
            Discard
          </Button>
          <Button variant="outline-primary" className="me-2">
            Save Draft
          </Button>
          <Button variant="primary" type="submit" form="project-form">
            {isEditMode ? "Update Project" : "Publish Project"}
          </Button>
        </div>
      </div>
      <Form id="project-form" onSubmit={handleSubmit}>
        <div className="json-object">
          <div className="json-brace">{"{"}</div>
          <div className="json-content">
            {/* id (slug) */}
            <div className="json-field">
              <label className="json-key">"id":</label>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter project slug (e.g., itsablog)"
                disabled={isEditMode} // Disable slug editing in update mode
              />
            </div>

            {/* title */}
            <div className="json-field">
              <label className="json-key">"title":</label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter project title"
              />
            </div>

            {/* client */}
            <div className="json-field">
              <label className="json-key">"client":</label>
              <Form.Control
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter client name"
              />
            </div>

            {/* website */}
            <div className="json-field">
              <label className="json-key">"website":</label>
              <Form.Control
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter website URL"
              />
            </div>

            {/* ghLink */}
            <div className="json-field">
              <label className="json-key">"ghLink":</label>
              <Form.Control
                type="url"
                name="ghLink"
                value={formData.ghLink}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter GitHub URL"
              />
            </div>

            {/* overview */}
            <div className="json-field">
              <label className="json-key">"overview":</label>
              <Form.Control
                as="textarea"
                rows={3}
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter project overview"
              />
            </div>

            {/* services */}
            <div className="json-field">
              <label className="json-key">"services":</label>
              <Form.Control
                type="text"
                name="services"
                value={formData.services}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter services (comma-separated)"
              />
            </div>

            {/* mainImage */}
            <div className="json-field">
              <label className="json-key">"mainImage":</label>
              <Form.Control
                type="file"
                name="mainImage"
                onChange={handleFileChange}
                className="json-value"
              />
              {isEditMode && formData.mainImage && (
                <div className="mt-2">
                  <img
                    src={formData.mainImage}
                    alt="Main"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
            </div>

            {/* images */}
            <div className="json-field">
              <label className="json-key">"images":</label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="json-value"
              />
              {isEditMode && formData.images.length > 0 && (
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {formData.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index + 1}`}
                      style={{ maxWidth: "100px" }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* challenges */}
            <div className="json-field">
              <label className="json-key">"challenges":</label>
              <div className="json-array">
                <div className="json-brace">{"["}</div>
                {formData.challenges.map((item, index) => (
                  <div key={index} className="json-object json-nested">
                    <div className="json-brace">{"{"}</div>
                    <div className="json-content">
                      <div className="json-field">
                        <label className="json-key">"title":</label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={item.title}
                          data-index={index}
                          onChange={handleChange}
                          className="json-value"
                          placeholder="Enter challenge title"
                        />
                      </div>
                      <div className="json-field">
                        <label className="json-key">"challenge":</label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="challenge"
                          value={item.challenge}
                          data-index={index}
                          onChange={handleChange}
                          className="json-value"
                          placeholder="Enter challenge description"
                        />
                      </div>
                      <div className="json-field">
                        <label className="json-key">"solution":</label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="solution"
                          value={item.solution}
                          data-index={index}
                          onChange={handleChange}
                          className="json-value"
                          placeholder="Enter solution description"
                        />
                      </div>
                    </div>
                    <div className="json-brace">{"}"}</div>
                  </div>
                ))}
                <div className="json-brace">{"]"}</div>
                <Button
                  variant="outline-success"
                  onClick={handleAddChallenge}
                  className="json-add-button"
                >
                  + Add Challenge
                </Button>
              </div>
            </div>

            {/* results */}
            <div className="json-field">
              <label className="json-key">"results":</label>
              <Form.Control
                as="textarea"
                rows={3}
                name="results"
                value={formData.results}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter project results"
              />
            </div>

            {/* tags */}
            <div className="json-field">
              <label className="json-key">"tags":</label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="json-value"
                placeholder="Enter tags (comma-separated)"
              />
            </div>
          </div>
          <div className="json-brace">{"}"}</div>
        </div>
        <Button type="submit" variant="success" className="w-100 mt-4">
          {isEditMode ? "Update Project" : "Submit Project"}
        </Button>
      </Form>
    </Container>
  );
};

export default ProjectForm;
