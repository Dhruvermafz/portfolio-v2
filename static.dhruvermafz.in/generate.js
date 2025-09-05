// Simulating the image files list (replace with actual file names or fetch from an API)
const imageFiles = ["image1.png", "image2.jpg", "image3.jpeg", "image4.gif"];

// Function to generate media items HTML
function generateMediaItems() {
  let mediaItems = "";
  imageFiles.forEach((file, index) => {
    const safeFile = encodeURIComponent(file); // Sanitize file name
    mediaItems += `
            <div>
                <div class="library-box">
                    <input type="checkbox" id="myCheckbox${index + 1}" />
                    <label for="myCheckbox${index + 1}">
                        <div>
                            <img src="./assets/media_browser/${safeFile}" class="img-fluid bg-img bg_size_content" alt="${safeFile}">
                        </div>
                        <div class="dropdown">
                            <a class="" href="#" role="button" id="dropdownMenuLink${
                              index + 1
                            }" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="ri-more-fill"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink${
                              index + 1
                            }">
                                <li><a class="dropdown-item d-flex align-items-center" href="./assets/media_browser/${safeFile}"><i class="ri-download-2-line me-2"></i>Download</a></li>
                                <li><a class="dropdown-item d-flex align-items-center" href="#"><i class="ri-delete-bin-line me-2"></i>Delete</a></li>
                            </ul>
                        </div>
                    </label>
                </div>
            </div>
        `;
  });

  // Insert the generated HTML into the media-library-sec div
  const mediaLibrary = document.querySelector(
    ".media-library-sec.ratio_square"
  );
  if (mediaLibrary) {
    mediaLibrary.innerHTML = mediaItems;
  } else {
    console.error("Media library section not found");
  }
}

// Run the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", generateMediaItems);
