import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./createproject.css";
import { API_URL } from "../../../config";
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
      [name]: files, // Assuming you want to store multiple files, so set it as an array
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

    // Append text fields to the FormData
    form.append("title", formData.title);
    form.append("client", formData.client);
    form.append("website", formData.website);
    form.append("github", formData.github);
    form.append("overview", formData.overview);
    form.append("results", formData.results);

    // Append images to the FormData
    if (formData.mainImage) {
      form.append("mainImage", formData.mainImage);
    }

    formData.images.forEach((image, index) => {
      form.append(`images[${index}]`, image);
    });

    // Append challenges
    formData.challenges.forEach((challenge, index) => {
      form.append(`challenges[${index}][title]`, challenge.title);
      form.append(`challenges[${index}][challenge]`, challenge.challenge);
      form.append(`challenges[${index}][solution]`, challenge.solution);
    });

    // Append tags as a comma-separated string or array
    form.append("tags", formData.tags);

    try {
      await axios.post(`${API_URL}/projects/`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Project added successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  return (
    <div className="col-md-10">
      <form onSubmit={handleSubmit} className="app-ecommerce">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
          <div className="d-flex flex-column justify-content-center">
            <h4 className="mb-1">Add a new Project</h4>
          </div>
          <div className="d-flex align-content-center flex-wrap gap-4">
            <div className="d-flex gap-4">
              <button className="btn btn-label-secondary">Discard</button>
              <button className="btn btn-label-primary">Save draft</button>
            </div>
            <button type="submit" className="btn btn-primary">
              Publish product
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="card mb-6">
              <div className="card-header">
                <h5 className="card-title mb-0">Product information</h5>
              </div>
              <div className="card-body">
                <div className="mb-6">
                  <label
                    className="form-label"
                    htmlFor="ecommerce-product-name"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="title"
                  />
                </div>
                <div className="row mb-6">
                  <div className="col">
                    <label
                      className="form-label"
                      htmlFor="ecommerce-product-sku"
                    >
                      Client
                    </label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Client"
                    />
                  </div>
                  <div className="col">
                    <label
                      className="form-label"
                      htmlFor="ecommerce-product-barcode"
                    >
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Website URL"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1">GitHub Link</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="GitHub URL"
                  />
                </div>
                <div>
                  <label className="mb-1">Overview</label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Project overview"
                  />
                </div>
              </div>
            </div>

            <div className="card mb-6">
              <div className="card-header">
                <h5 className="card-title mb-0">Challenges</h5>
              </div>
              <div className="card-body">
                {formData.challenges.map((challenge, index) => (
                  <div key={index} className="challenge-form">
                    <div className="row">
                      <div className="mb-6 col-4">
                        <label
                          className="form-label"
                          htmlFor={`challenge-title-${index}`}
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id={`challenge-title-${index}`}
                          name="title"
                          value={challenge.title}
                          onChange={handleChange}
                          data-index={index}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-6 col-4">
                        <label
                          className="form-label"
                          htmlFor={`challenge-${index}`}
                        >
                          Challenge
                        </label>
                        <textarea
                          id={`challenge-${index}`}
                          name="challenge"
                          value={challenge.challenge}
                          onChange={handleChange}
                          data-index={index}
                          className="form-control"
                          placeholder="Challenge description"
                        />
                      </div>
                      <div className="mb-6 col-4">
                        <label
                          className="form-label"
                          htmlFor={`solution-${index}`}
                        >
                          Solution
                        </label>
                        <textarea
                          id={`solution-${index}`}
                          name="solution"
                          value={challenge.solution}
                          onChange={handleChange}
                          data-index={index}
                          className="form-control"
                          placeholder="Solution"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddChallenge}
                >
                  Add another challenge
                </button>
              </div>
            </div>

            <div className="card mb-6">
              <div className="card-header">
                <h5 className="card-title mb-0">Results</h5>
              </div>
              <input
                type="text"
                name="results"
                value={formData.results}
                onChange={handleChange}
                className="form-control"
                placeholder="Results"
              />
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card mb-6">
              <div className="card-header">
                <h5 className="card-title mb-0">Tags</h5>
              </div>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="form-control"
                placeholder="Tags"
              />
            </div>

            <div className="card mb-6">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0 card-title">Main Image</h5>
                <a href="javascript:void(0);" className="fw-medium">
                  Add media from URL
                </a>
              </div>
              <div className="card-body">
                <div className="dz-message needsclick">
                  <p className="h4 needsclick pt-3 mb-2">
                    Drag and drop your image here
                  </p>
                  <p className="h6 text-muted d-block fw-normal mb-2">or</p>
                  <span
                    className="note needsclick btn btn-sm btn-label-primary"
                    id="btnBrowse"
                  >
                    Browse image
                  </span>
                </div>
                <div className="fallback">
                  <input
                    type="file"
                    name="mainImage"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="card mb-6">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0 card-title">Additional Images</h5>
                <a href="javascript:void(0);" className="fw-medium">
                  Add media from URL
                </a>
              </div>
              <div className="card-body">
                <div className="dz-message needsclick">
                  <p className="h4 needsclick pt-3 mb-2">
                    Drag and drop your image here
                  </p>
                  <p className="h6 text-muted d-block fw-normal mb-2">or</p>
                  <span
                    className="note needsclick btn btn-sm btn-label-primary"
                    id="btnBrowse"
                  >
                    Browse image
                  </span>
                </div>
                <div className="fallback">
                  <input
                    type="file"
                    name="images"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
