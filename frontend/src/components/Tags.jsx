import React from "react";

const Tags = ({ tagName, href }) => {
  return (
    <a href={href} className="tags">
      {tagName}
    </a>
  );
};

export default Tags;
