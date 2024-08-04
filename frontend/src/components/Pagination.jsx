import React from "react";

const Pagination = () => {
  return (
    <div class="pagination">
      <ul class="list-unstyled">
        <li class="prev">
          <button>
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button>1</button>
        </li>
        <li>
          <button>2</button>
        </li>
        <li>
          <button>3</button>
        </li>
        <li>
          <button class="next-page-btn">
            <span class="dots">
              <i class="fas fa-ellipsis-h"></i>
            </span>
            <span class="next-page">
              <svg
                class="icon icon-arrow-right"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 17 5-5-5-5"></path>
                <path d="m13 17 5-5-5-5"></path>
              </svg>
            </span>
            <span class="next-page-number">Next 4 pages</span>
          </button>
        </li>
        <li>
          <button>100</button>
        </li>
        <li class="next">
          <button>
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
