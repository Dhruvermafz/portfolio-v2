import React from "react";

const MediaWrapper = () => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="title-header option-title justify-content-start">
                <h5>Media Library</h5>
                <div class="selected-options">
                  <ul>
                    <li>selected(0)</li>
                    <li>
                      <a href="#">
                        <i class="ri-download-2-line"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="ri-delete-bin-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="right-options ms-auto">
                  <ul>
                    <li>
                      <a
                        class="btn btn-solid"
                        href="javascript:void(0)"
                        data-bs-toggle="modal"
                        data-bs-target="#mediaModel"
                      >
                        Add Media
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row row-cols-xl-6 row-cols-md-5 row-cols-sm-3 row-cols-2 g-sm-3 g-2 media-library-sec ratio_square">
                <div>
                  <div class="library-box">
                    <input type="checkbox" id="myCheckbox1" />
                    <label for="myCheckbox1">
                      <div>
                        <img
                          src="assets/images/product/1.png"
                          class="img-fluid bg-img bg_size_content"
                          alt=""
                        />
                      </div>
                      <div class="dropdown">
                        <a
                          class=""
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="ri-more-fill"></i>
                        </a>

                        <ul
                          class="dropdown-menu dropdown-menu-end"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <li>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              <i class="ri-download-2-line me-2"></i>Download
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              <i class="ri-delete-bin-line me-2"></i>Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </label>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaWrapper;
