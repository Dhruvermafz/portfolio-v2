import React from "react";
import PageTitle from "../components/Common/PageTitle";

const Blogs = () => {
  return (
    <main class="adminuiux-content has-sidebar" onclick="contentClick()">
      <PageTitle />

      <div class="container mt-3" id="main-content">
        <div class="row gx-3 gx-lg-4 align-items-center justify-content-center mb-3 mb-lg-4">
          <div class="col-12 col-md mb-3 mb-md-0">
            <div class="input-group input-group-lg shadow-sm rounded">
              <span class="input-group-text text-theme-1 border-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                class="form-control border-0"
                type="search"
                placeholder="Search your query here..."
              />
            </div>
          </div>
          <div class="col-auto">
            <button class="btn btn-lg btn-theme me-2">Ask Query</button>
            <button class="btn btn-lg btn-theme">Write Post</button>
          </div>
        </div>

        <div class="row gx-3">
          <div class="col-12 col-md-12 col-lg-6 col-xl-3">
            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <div class="row gx-3 align-items-center">
                  <div class="col-auto">
                    <div class="avatar avatar-50 rounded-circle bg-theme-1 theme-purple shadow-sm text-white">
                      <i class="bi bi-people h5"></i>
                    </div>
                  </div>
                  <div class="col">
                    <h5 class="mb-1">100+ million</h5>
                    <p class="small text-secondary">
                      Monthly visitors & Words Exchanged
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-12 col-lg-6 col-xl-3">
            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <div class="row gx-3 align-items-center">
                  <div class="col-auto">
                    <div class="avatar avatar-50 rounded-circle bg-theme-1 theme-orange shadow-sm text-white">
                      <i class="bi bi-life-preserver h5"></i>
                    </div>
                  </div>
                  <div class="col">
                    <h5 class="mb-1">45.1+ billion</h5>
                    <p class="small text-secondary">
                      People get helps and queries solved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-12 col-lg-6 col-xl-3">
            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <div class="row gx-3 align-items-center">
                  <div class="col-auto">
                    <div class="avatar avatar-50 rounded-circle bg-theme-1 theme-green shadow-sm text-white">
                      <i class="bi bi-patch-check h5"></i>
                    </div>
                  </div>
                  <div class="col">
                    <h5 class="mb-1">101% ROI</h5>
                    <p class="small text-secondary">
                      Customer used our premium product features
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-12 col-lg-6 col-xl-3">
            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <div class="row gx-3 align-items-center">
                  <div class="col-auto">
                    <div class="avatar avatar-50 rounded-circle bg-theme-1 shadow-sm text-white">
                      <i class="bi bi-globe h5"></i>
                    </div>
                  </div>
                  <div class="col">
                    <h5 class="mb-1">1000</h5>
                    <p class="small text-secondary">
                      Average new web application build per month.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row gx-3 gx-lg-4 align-items-center">
          <div class="col mb-3 mb-lg-4">
            <h6>225 questions</h6>
          </div>
          <div class="col-auto mb-3 mb-lg-4">
            <span class="me-2">Sort by:</span>
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Filter toggle"
            >
              <input
                type="radio"
                name="filterbox"
                class="btn-check"
                id="btncheck1filter"
                checked
              />
              <label class="btn btn-outline-theme" for="btncheck1filter">
                Newest
              </label>

              <input
                type="radio"
                name="filterbox"
                class="btn-check"
                id="btncheck2filter"
              />
              <label class="btn btn-outline-theme" for="btncheck2filter">
                Active
              </label>

              <input
                type="radio"
                name="filterbox"
                class="btn-check"
                id="btncheck3filter"
              />
              <label class="btn btn-outline-theme" for="btncheck3filter">
                Unanswered
              </label>

              <input
                type="radio"
                name="filterbox"
                class="btn-check"
                id="btncheck4filter"
              />
              <label class="btn btn-outline-theme" for="btncheck4filter">
                Top Rated
              </label>
            </div>
          </div>
        </div>

        <div class="row gx-3 gx-lg-4">
          <div class="col-12 col-md-8 col-lg-9 col-xl-9">
            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <div class="row gx-3 align-items-center mb-3">
                  <div class="col">
                    <h4>
                      <a href="adminux-forum-details.html" class="style-none">
                        How to create admin dashboard for Finance Application?
                      </a>
                    </h4>
                  </div>
                  <div class="col-auto">
                    <div class="dropdown">
                      <button
                        class="btn btn-square btn-link dropdown-toggle no-caret"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="bi bi-three-dots-vertical vm"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end ">
                        <li>
                          <a class="dropdown-item" href="#">
                            Hide from Timeline
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="row gx-3 align-items-center mb-3">
                  <div class="col-auto">
                    <figure class="avatar avatar-40 rounded-circle coverimg vm">
                      <img src="assets/img/modern-ai-image/user-4.jpg" alt="" />
                    </figure>
                  </div>
                  <div class="col">
                    <p class="small text-secondary mb-0">Asked by</p>
                    <p class="mb-0">
                      David Warner{" "}
                      <small class="text-secondary">1 hr ago</small>
                    </p>
                  </div>
                </div>
                <p class="text-secondary">
                  You can easily find template for UI with best customize
                  facility named "GetAdminUX". AdminUX just because every home
                  with windows needs door. everWhen you get older many people
                  will listen you carefully, no matter if its correct discussion
                  or not.
                </p>
                <p>
                  <span class="badge badge-lg badge-light text-bg-theme-1 theme-red me-1 mt-1">
                    Support
                  </span>
                  <span class="badge badge-lg badge-light text-bg-theme-1 theme-red me-1 mt-1">
                    Development
                  </span>
                </p>
              </div>
              <div class="card-footer">
                <div class="row gx-3 align-items-center">
                  <div class="col-auto">
                    <div class="btn btn-outline-theme theme-red btn-square rounded-circle">
                      <i class="bi bi-heart h5"></i>
                    </div>
                  </div>
                  <div class="col-auto">
                    <p class="text-secondary small mb-0">Liked by</p>
                    <h5>1.2k</h5>
                  </div>
                  <div class="col-auto">
                    <div class="avatar avatar-40 coverimg rounded-circle me-1">
                      <img src="assets/img/modern-ai-image/user-2.jpg" alt="" />
                    </div>
                    <div class="avatar avatar-40 coverimg rounded-circle me-1">
                      <img src="assets/img/modern-ai-image/user-3.jpg" alt="" />
                    </div>
                    <div class="avatar avatar-40 coverimg rounded-circle me-1">
                      <img src="assets/img/modern-ai-image/user-4.jpg" alt="" />
                    </div>
                  </div>
                  <div class="col">
                    <p class="text-secondary small mb-0">Answered by</p>
                    <h5>9+</h5>
                  </div>
                  <div class="col-auto text-center">
                    <p class="small text-secondary mb-0">Views</p>
                    <h5>152</h5>
                  </div>
                  <div class="col-auto text-center">
                    <p class="small text-secondary mb-0">Watching</p>
                    <h5>256</h5>
                  </div>
                  <div class="col-auto">
                    <a class="btn btn-theme btn-md" href="#">
                      Answer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 col-lg-3 col-xl-3">
            <div class="card adminuiux-card shadow-sm bg-l-gradient-light mb-3 mb-lg-4">
              <div class="card-header border-bottom">
                <h6>Featured Questions</h6>
              </div>
              <div class="card-body p-0">
                <div class="list-group list-group-flush bg-none">
                  <a
                    href="https://www.adminuiux.com/adminuiux/adminux/html/adminuiux-forum-details.html"
                    class="list-group-item list-group-item-action"
                  >
                    How to become most powerful development partner?
                  </a>
                  <a
                    href="https://www.adminuiux.com/adminuiux/adminux/html/adminuiux-forum-details.html"
                    class="list-group-item list-group-item-action"
                  >
                    The best way to get started with the getAdminUX
                  </a>
                  <a
                    href="https://www.adminuiux.com/adminuiux/adminux/html/adminuiux-forum-details.html"
                    class="list-group-item list-group-item-action"
                  >
                    I have found egyptian assets, What I should do with it?
                  </a>
                  <a
                    href="https://www.adminuiux.com/adminuiux/adminux/html/adminuiux-forum-details.html"
                    class="list-group-item list-group-item-action"
                  >
                    How long it will take to make world record for traveling?
                  </a>
                  <a
                    href="https://www.adminuiux.com/adminuiux/adminux/html/adminuiux-forum-details.html"
                    class="list-group-item list-group-item-action "
                  >
                    I am disabled person by my hands. What is my career options?
                  </a>
                </div>
              </div>
            </div>

            <h6 class="mb-3 mb-lg-4">Trending Tags</h6>
            <div>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Android
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                iOS
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Windows11
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Fluent ui
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Win UI
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Template
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Dashboard
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Bootstrap
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Angular admin
              </a>
              <a
                href="#"
                class="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
              >
                Free Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blogs;
