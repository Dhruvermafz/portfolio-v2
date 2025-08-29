import React from "react";

const PageTitle = () => {
  return (
    <div class="container-fluid py-3">
      <div class="row gx-3 gx-lg-4 align-items-center page-title">
        <div class="col col-sm mb-3 mb-sm-0 order-1">
          <h5 class="mb-0">My Dashboard</h5>
          <p class="text-secondary small">This is personal intranet</p>
        </div>
        <div class="col-12 col-sm-auto order-3 order-sm-2">
          <div class="input-group input-group-md width-250">
            <input
              type="text"
              class="form-control bg-transparent"
              value=""
              id="daterangepickerranges"
            />
            <span
              class="input-group-text text-theme-1 bg-transparent"
              id="titlecalendar"
              onclick="this.previousElementSibling.click()"
            >
              <i class="bi bi-calendar-event"></i>
            </span>
          </div>
        </div>
        <div class="col-auto ps-0 position-relative order-2 order-sm-3 mb-3 mb-sm-0">
          <div class="dropdown d-inline-block">
            <a
              class="btn btn-link btn-square no-caret dropdown-toggle"
              href="#"
              role="button"
              id="filterintitle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <i class="bi bi-filter"></i>
            </a>
            <div
              class="dropdown-menu width-300"
              aria-labelledby="filterintitle"
            >
              <div class="p-1 mb-2">
                <div class="input-group input-group-md rounded">
                  <span class="input-group-text text-theme-1">
                    <i class="bi bi-box"></i>
                  </span>
                  <select
                    class="form-control choices"
                    id="titltfilterlist"
                    multiple
                  >
                    <option value="San Francisco">San Francisco</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Chicago">Chicago</option>
                    <option value="India" selected="">
                      India
                    </option>
                    <option value="Sydney">Sydney</option>
                    <option value="Seattle">Seattle</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div class="invalid-feedback">
                  You have already selected maximum option allowed. (This is
                  Configurable)
                </div>
              </div>
              <div class="p-1">
                <h6 class="mb-0">Orders:</h6>
                <p class="text-secondary small">1256 orders last week</p>
              </div>
              <ul class="list-group list-group-flush bg-transparent border-0 mb-2">
                <li class="list-group-item">
                  <div class="row gx-3 gx-lg-4">
                    <div class="col">Online Orders</div>
                    <div class="col-auto">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="titleswitch1"
                        />
                        <label
                          class="form-check-label"
                          for="titleswitch1"
                        ></label>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="row gx-3 gx-lg-4">
                    <div class="col">Offline Orders</div>
                    <div class="col-auto">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="titleswitch2"
                          checked=""
                        />
                        <label
                          class="form-check-label"
                          for="titleswitch2"
                        ></label>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="p-1">
                <div class="row gx-3 gx-lg-4">
                  <div class="col">
                    <button class="btn btn-outline-secondary border ddclose">
                      cancel
                    </button>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-theme">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            href="adminux-company-help-center.html"
            class="btn btn-link btn-square"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            id="stylise"
          >
            <i class="bi bi-life-preserver"></i>
          </a>
          <a
            href="https://1.envato.market/7N7Br"
            target="_blank"
            class="btn btn-link btn-square"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <span class="bi bi-basket position-relative">
              <span class="position-absolute top-0 start-100 p-1 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
