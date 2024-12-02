import React from "react";

const Tags = ({ tags = [] }) => {
  // Share function for native sharing
  const handleNativeShare = (e) => {
    e.preventDefault(); // Prevent default `<a>` behavior
    const shareData = {
      title: "Check out this blog!",
      text: "I found this amazing blog, and I thought you'd like it.",
      url: window.location.href, // Current page URL
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Web Share API is not supported on this browser.");
    }
  };

  return (
    <div className="tags-and-share">
      <div className="tags">
        <h3 className="title">Tags:</h3>
        <ul className="list-unstyled">
          {tags.map((tag, index) => (
            <li key={index}>
              <a href={`/category/${tag}`}>{tag}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="share">
        <h3 className="title">Share:</h3>
        <div className="social-media-icon mt-0">
          <ul className="list-unstyled">
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-pinterest"></i>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleNativeShare}>
                <i className="fas fa-share-alt"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tags;
