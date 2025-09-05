<?php
// Directory to scan for images
$mediaDir = './assets/media_browser/projects';
$imageFiles = [];

// Fetch image files
if (is_dir($mediaDir)) {
    $files = scandir($mediaDir);
    foreach ($files as $file) {
        if (preg_match('/\.(png|jpg|jpeg|gif)$/i', $file)) {
            $imageFiles[] = $file;
        }
    }
}

// Generate HTML for media items
$mediaItems = '';
foreach ($imageFiles as $index => $file) {
    $file = htmlspecialchars($file);
    $mediaItems .= <<<HTML
        <div>
            <div class="library-box">
                <input type="checkbox" id="myCheckbox{$index + 1}" />
                <label for="myCheckbox{$index + 1}">
                    <div>
                        <img src="/assets/media_browser/{$file}" class="img-fluid bg-img bg_size_content" alt="{$file}">
                    </div>
                    <div class="dropdown">
                        <a class="" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="ri-more-fill"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item d-flex align-items-center" href="/assets/media_browser/{$file}"><i class="ri-download-2-line me-2"></i>Download</a></li>
                            <li><a class="dropdown-item d-flex align-items-center" href="#"><i class="ri-delete-bin-line me-2"></i>Delete</a></li>
                        </ul>
                    </div>
                </label>
            </div>
        </div>
HTML;
}

// Read the original HTML template
$template = file_get_contents('index.html');

// Replace the placeholder with dynamic content
$placeholder = '<div class="row row-cols-xl-6 row-cols-md-5 row-cols-sm-3 row-cols-2 g-sm-3 g-2 media-library-sec ratio_square">';
$htmlContent = str_replace($placeholder, $placeholder . $mediaItems, $template);

// Save to dist/index.html
$distDir = './dist';
if (!is_dir($distDir)) {
    mkdir($distDir, 0755, true);
}
file_put_contents("$distDir/index.html", $htmlContent);

// Copy assets to dist
function copyDir($src, $dst) {
    $dir = opendir($src);
    if (!is_dir($dst)) {
        mkdir($dst, 0755, true);
    }
    while (($file = readdir($dir)) !== false) {
        if ($file !== '.' && $file !== '..') {
            if (is_dir("$src/$file")) {
                copyDir("$src/$file", "$dst/$file");
            } else {
                copy("$src/$file", "$dst/$file");
            }
        }
    }
    closedir($dir);
}
copyDir('./assets', "$distDir/assets");

echo "Generated index.html and copied assets to /dist\n";
?>