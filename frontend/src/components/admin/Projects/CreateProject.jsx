import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/projects/add", formData);
      alert("Project added successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  return (
    <div className="col-md-10">
      <form onSubmit={handleSubmit} class="app-ecommerce">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
          <div class="d-flex flex-column justify-content-center">
            <h4 class="mb-1">Add a new Project</h4>
          </div>
          <div class="d-flex align-content-center flex-wrap gap-4">
            <div class="d-flex gap-4">
              <button class="btn btn-label-secondary">Discard</button>
              <button class="btn btn-label-primary">Save draft</button>
            </div>
            <button type="submit" class="btn btn-primary">
              Publish product
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="card mb-6">
              <div class="card-header">
                <h5 class="card-tile mb-0">Product information</h5>
              </div>
              <div class="card-body">
                <div class="mb-6">
                  <label class="form-label" for="ecommerce-product-name">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="title"
                  />
                </div>
                <div class="row mb-6">
                  <div class="col">
                    <label class="form-label" for="ecommerce-product-sku">
                      Client
                    </label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      class="form-control"
                      placeholder="SKU"
                    />
                  </div>
                  <div class="col">
                    <label class="form-label" for="ecommerce-product-barcode">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      class="form-control"
                      placeholder="0123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label class="mb-1">GH Link</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="SKU"
                  />
                </div>
                <div>
                  <label class="mb-1">Overview</label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="SKU"
                  />
                </div>
              </div>
            </div>

            <div class="card mb-6">
              <div class="card-header">
                <h5 class="card-title mb-0">Challenges</h5>
              </div>
              <div class="card-body">
                <form class="form-repeater">
                  <div data-repeater-list="group-a">
                    <div data-repeater-item>
                      <div class="row">
                        <div class="mb-6 col-4">
                          <label class="form-label" for="form-repeater-1-1">
                            Title
                          </label>
                        </div>

                        <div class="mb-6 col-8">
                          <label
                            class="form-label invisible"
                            for="form-repeater-1-2"
                          >
                            Challenge
                          </label>
                          <input
                            type="number"
                            id="form-repeater-1-2"
                            class="form-control"
                            placeholder="Enter size"
                          />
                        </div>
                        <div class="mb-6 col-8">
                          <label
                            class="form-label invisible"
                            for="form-repeater-1-2"
                          >
                            Solution
                          </label>
                          <input
                            type="number"
                            id="form-repeater-1-2"
                            class="form-control"
                            placeholder="Enter size"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-primary" data-repeater-create>
                      <i class="ti ti-plus ti-xs me-2"></i>
                      Add another
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="card mb-6">
              <div class="card-header">
                <h5 class="card-title mb-0">Results</h5>
              </div>
              <input
                type="text"
                name="results"
                value={formData.results}
                onChange={handleChange}
                class="form-control"
                placeholder="SKU"
              />
            </div>
          </div>

          <div class="col-12 col-lg-4">
            <div class="card mb-6">
              <div class="card-header">
                <h5 class="card-title mb-0">Tags</h5>
              </div>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                class="form-control"
                placeholder="SKU"
              />
            </div>

            <div className="card md-">
              <div class="card mb-6">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0 card-title">Main Image</h5>
                  <a href="javascript:void(0);" class="fw-medium">
                    Add media from URL
                  </a>
                </div>
                <div class="card-body">
                  <div class="dz-message needsclick">
                    <p class="h4 needsclick pt-3 mb-2">
                      Drag and drop your image here
                    </p>
                    <p class="h6 text-muted d-block fw-normal mb-2">or</p>
                    <span
                      class="note needsclick btn btn-sm btn-label-primary"
                      id="btnBrowse"
                    >
                      Browse image
                    </span>
                  </div>
                  <div class="fallback">
                    <input
                      type="file"
                      name="mainImage"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <div class="card mb-6">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0 card-title">Images</h5>
                  <a href="javascript:void(0);" class="fw-medium">
                    Add media from URL
                  </a>
                </div>
                <div class="card-body">
                  <div class="dz-message needsclick">
                    <p class="h4 needsclick pt-3 mb-2">
                      Drag and drop your image here
                    </p>
                    <p class="h6 text-muted d-block fw-normal mb-2">or</p>
                    <span
                      class="note needsclick btn btn-sm btn-label-primary"
                      id="btnBrowse"
                    >
                      Browse image
                    </span>
                  </div>
                  <div class="fallback">
                    <input
                      type="file"
                      name="mainImage"
                      onChange={handleFileChange}
                    />
                  </div>
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
