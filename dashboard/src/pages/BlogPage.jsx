import React from "react";
import PageTitle from "../components/Common/PageTitle";

const BlogPage = () => {
  return (
    <main class="adminuiux-content has-sidebar" onclick="contentClick()">
      <PageTitle />

      <div class="container mt-3" id="main-content">
        <div class="row gx-3 gx-lg-4">
          <div class="col-12 col-md-8 col-lg-9 col-xl-9">
            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <div class="row gx-3 align-items-center mb-3">
                  <div class="col">
                    <h4>
                      How to create admin dashboard for Finance Application?
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
                  <div class="col-auto text-end">
                    <p class="small text-secondary mb-0">Modified</p>
                    <p class="mb-0">8 min ago</p>
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
                <div class="row gx-3 align-items-center mb-3">
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
                </div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control border"
                    placeholder="Your comment here..."
                  />
                  <button class="btn btn-light border" type="button">
                    Comment
                  </button>
                </div>
              </div>
            </div>

            <h5 class="title">Answers</h5>
            <div class="card adminuiux-card shadow-sm bg-l-gradient-light theme-green mb-3 mb-lg-4">
              <div class="card-body">
                <p>
                  <span class="badge badge-lg text-bg-theme-1">
                    Correct Answer
                  </span>
                </p>
                <p class="text-secondary">
                  I found a solution to your problem. <br />
                  The installer works fine once I removed it out of my cluttered
                  download folder
                  <br />
                  I ran various tests and I'm pretty sure that i found the root
                  to the problem.
                  <br />
                  You can easily find template for UI with best customize
                  facility named "GetAdminUX". AdminUX just because every home
                  with windows needs door. everWhen you get older many people
                  will listen you carefully, no matter if its correct discussion
                  or not.
                </p>

                <div class="row gx-3 align-items-center mt-3">
                  <div class="col-auto">
                    <figure class="avatar avatar-40 rounded-circle coverimg vm">
                      <img src="assets/img/modern-ai-image/user-1.jpg" alt="" />
                    </figure>
                  </div>
                  <div class="col">
                    <p class="small text-secondary mb-0">Answer by</p>
                    <p class="mb-0">
                      Jack Manelia{" "}
                      <small class="text-secondary">30 min ago</small>
                    </p>
                  </div>
                  <div class="col-auto text-end">
                    <p class="small text-secondary mb-0">Modified</p>
                    <p class="mb-0">8 min ago</p>
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
                            Mark as Correct
                          </a>
                        </li>
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
              </div>
              <div class="card-footer border-top">
                <div class="row gx-3 align-items-center mb-3">
                  <div class="col-auto">
                    <div class="btn btn-theme theme-red btn-square rounded-circle">
                      <i class="bi bi-heart-fill h5"></i>
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
                </div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control border"
                    placeholder="Your comment here..."
                  />
                  <button class="btn btn-light border" type="button">
                    Comment
                  </button>
                </div>

                <div class="row gx-3 mt-3">
                  <a href="#" class="col-auto">
                    <figure class="avatar avatar-40 rounded-circle vm shadow-sm">
                      <img src="assets/img/modern-ai-image/user-4.jpg" alt="" />
                    </figure>
                  </a>
                  <div class="col">
                    <p class="mb-1">
                      <a href="#">Jack Lee</a>{" "}
                      <span class="text-secondary d-inline-block ms-2 small">
                        2 min ago
                      </span>
                    </p>
                    <p>This works for me</p>
                    <div class="mt-2">
                      <a class="btn btn-sm btn-link text-theme">
                        <i class="bi bi-heart vm"></i> Like{" "}
                        <small class="ms-2">3</small>
                      </a>

                      <a class="btn btn-sm btn-link theme-yellow ms-2">
                        <i class="bi bi-chat-right-text vm small"></i> Reply{" "}
                        <small class="ms-2">5</small>
                      </a>
                    </div>

                    <div class="row gx-3 mt-3">
                      <a href="#" class="col-auto">
                        <figure class="avatar avatar-40 rounded-circle vm shadow-sm">
                          <img
                            src="assets/img/modern-ai-image/user-2.jpg"
                            alt=""
                          />
                        </figure>
                      </a>
                      <div class="col">
                        <p class="mb-1">
                          <a href="#">Kavyaa Johnson</a>{" "}
                          <span class="text-secondary d-inline-block ms-2 small">
                            2 min ago
                          </span>
                        </p>
                        <p>Yes I did it too.</p>
                        <div class="mt-2">
                          <a class="btn btn-sm btn-link text-theme">
                            <i class="bi bi-heart vm"></i> Like{" "}
                            <small class="ms-2">3</small>
                          </a>

                          <a class="btn btn-sm btn-link theme-yellow ms-2">
                            <i class="bi bi-chat-right-text vm small"></i> Reply{" "}
                            <small class="ms-2">5</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <p class="text-secondary">
                  I found a solution to your problem. <br />
                  The installer works fine once I removed it out of my cluttered
                  download folder
                  <br />
                  I ran various tests and I'm pretty sure that i found the root
                  to the problem.
                  <br />
                  You can easily find template for UI with best customize
                  facility named "GetAdminUX". AdminUX just because every home
                  with windows needs door. everWhen you get older many people
                  will listen you carefully, no matter if its correct discussion
                  or not.
                </p>

                <div class="row gx-3 align-items-center mt-3">
                  <div class="col-auto">
                    <figure class="avatar avatar-40 rounded-circle coverimg vm">
                      <img src="assets/img/modern-ai-image/user-1.jpg" alt="" />
                    </figure>
                  </div>
                  <div class="col">
                    <p class="small text-secondary mb-0">Answer by</p>
                    <p class="mb-0">
                      Jack Manelia{" "}
                      <small class="text-secondary">30 min ago</small>
                    </p>
                  </div>
                  <div class="col-auto text-end">
                    <p class="small text-secondary mb-0">Modified</p>
                    <p class="mb-0">8 min ago</p>
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
                            Mark as Correct
                          </a>
                        </li>
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
              </div>
              <div class="card-footer border-top">
                <div class="row gx-3 align-items-center mb-3">
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
                </div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control border"
                    placeholder="Your comment here..."
                  />
                  <button class="btn btn-light border" type="button">
                    Comment
                  </button>
                </div>
              </div>
            </div>

            <div class="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div class="card-body">
                <h5 class="mb-3 mb-lg-4">Your Answer</h5>
                <div class="FroalaEditor"></div>
                <p class="text-secondary my-3">
                  <span class="badge bg-yellow fw-medium me-1 vm">
                    Froala Editor Demo
                  </span>{" "}
                  Awesome features & pricing{" "}
                  <a href="https://cart.froala.com/" target="_blank">
                    Read more
                  </a>
                </p>
                <div class="row gx-3 mb-3 mb-lg-4">
                  <div class="col-auto">
                    <button class="btn btn-sm btn-outline-theme" type="button">
                      <i class="bi bi-paperclip me-0 me-md-2"></i>{" "}
                      <span class="d-none d-md-inline-block">Attachment</span>
                    </button>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-sm btn-outline-theme" type="button">
                      <i class="bi bi-link"></i>{" "}
                      <span class="d-none d-md-inline-block">Insert Link</span>
                    </button>
                  </div>
                </div>

                <div class="row gx-3">
                  <div class="col">
                    <button class="btn btn-theme" type="button">
                      <i class="bi bi-send me-2"></i> Send
                    </button>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-link theme-red" type="button">
                      <i class="bi bi-trash h4 me-2"></i> Discard
                    </button>
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

export default BlogPage;
