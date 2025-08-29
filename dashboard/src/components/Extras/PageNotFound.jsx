import React from "react";

const PageNotFound = () => {
  return (
    <main class="adminuiux-content has-sidebar" onclick="contentClick()">
      <div class="container mt-3" id="main-content">
        <div
          class="card adminuiux-card shadow-sm border-0 height-dynamic position-relative overflow-hidden bg-theme-1 theme-red"
          style="--h-dynamic: calc(100vh - 140px)"
        >
          <video
            muted=""
            autoplay=""
            loop=""
            class="m-0 position-absolute start-50 top-50 translate-middle w-100 coverimg opacity-50 d-block"
          >
            <source src="assets/img/adminux/video-4.mp4" type="video/mp4" />
          </video>
          <div class="card-body z-index-1">
            <div class="row align-items-center justify-content-center text-center text-white h-100">
              <div class="col-auto">
                <h1 class="fw-bold" style="font-size: 140px;">
                  4<i class="bi bi-wrench-adjustable-circle mx-2"></i>4
                </h1>
                <h2 class="fw-bold mb-0">Something went wrong!</h2>
                <h5 class="">Link is broken or page removed</h5>
                <p class="small opacity-75">
                  The page doesn't exist or removed.
                  <br />
                  Please check url or we suggest to go back home
                </p>

                <a href="adminux-dashboard.html" class="btn btn-light">
                  Back to home <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
