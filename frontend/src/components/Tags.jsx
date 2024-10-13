import React from "react";

const Tags = ({ tagName, href }) => {
  return (
    <div class="tags-and-share">
      <div class="tags">
        <h3 class="title">Tags:</h3>
        <ul class="list-unstyled">
          <li>
            <a href={href}>{tagName}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tags;
