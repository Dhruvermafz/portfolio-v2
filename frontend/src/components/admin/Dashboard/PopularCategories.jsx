import React from "react";

const PopularCategories = () => {
  return (
    <div class="col-span-full lg:col-span-6 3xl:col-span-4 card px-0 ">
      <div class="flex-center-between px-6 mb-7">
        <h6 class="card-title">Popular categories</h6>
        <div class="leading-none shrink-0 text-xs text-gray-500 dark:text-dark-text dk-border-one rounded-full px-2 py-1 dk-theme-card-square">
          07 Days
        </div>
      </div>
      <div class="max-h-[350px] smooth-scrollbar" data-scrollbar>
        <ul class="divide-y divide-gray-200 dark:divide-dark-border-three space-y-5 *:pt-5 overflow-hidden px-6">
          <li class="flex-center-between first:pt-0">
            <div class="flex items-center gap-2.5">
              <div class="size-12 rounded-50 bg-primary-200 dark:bg-dark-icon flex-center flex-shrink-0 dk-theme-card-square">
                <img
                  src="assets/images/icons/category/graphic-design.svg"
                  alt="icon"
                />
              </div>
              <div>
                <h6 class="leading-none text-heading font-semibold mb-2 line-clamp-1">
                  <a href="#" class="truncate">
                    Graphic Design
                  </a>
                </h6>
                <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold">
                  90+ Courses
                </p>
              </div>
            </div>
            <div class="ms-auto mr-5">
              <div id="category-one"></div>
            </div>
            <a
              href="#"
              class="flex-center size-6 rounded-md bg-primary-200 dark:bg-dark-icon shrink-0 dk-theme-card-square"
            >
              <i class="ri-arrow-right-line text-gray-500 dark:text-dark-text text-[14px]"></i>
            </a>
          </li>
          <li class="flex-center-between first:pt-0">
            <div class="flex items-center gap-2.5">
              <div class="size-12 rounded-50 bg-primary-200 dark:bg-dark-icon flex-center flex-shrink-0 dk-theme-card-square">
                <img src="assets/images/icons/category/ui-ux.svg" alt="icon" />
              </div>
              <div>
                <h6 class="leading-none text-heading font-semibold mb-2 line-clamp-1">
                  <a href="#" class="truncate">
                    UI/UX Design
                  </a>
                </h6>
                <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold">
                  90+ Courses
                </p>
              </div>
            </div>
            <div class="ms-auto mr-5">
              <div id="category-two"></div>
            </div>
            <a
              href="#"
              class="flex-center size-6 rounded-md bg-primary-200 dark:bg-dark-icon shrink-0 dk-theme-card-square"
            >
              <i class="ri-arrow-right-line text-gray-500 dark:text-dark-text text-[14px]"></i>
            </a>
          </li>
          <li class="flex-center-between first:pt-0">
            <div class="flex items-center gap-2.5">
              <div class="size-12 rounded-50 bg-primary-200 dark:bg-dark-icon flex-center flex-shrink-0 dk-theme-card-square">
                <img
                  src="assets/images/icons/category/web-dev.svg"
                  alt="icon"
                />
              </div>
              <div>
                <h6 class="leading-none text-heading font-semibold mb-2 line-clamp-1">
                  <a href="#" class="truncate">
                    Web Development
                  </a>
                </h6>
                <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold">
                  90+ Courses
                </p>
              </div>
            </div>
            <div class="ms-auto mr-5">
              <div id="category-three"></div>
            </div>
            <a
              href="#"
              class="flex-center size-6 rounded-md bg-primary-200 dark:bg-dark-icon shrink-0 dk-theme-card-square"
            >
              <i class="ri-arrow-right-line text-gray-500 dark:text-dark-text text-[14px]"></i>
            </a>
          </li>
          <li class="flex-center-between first:pt-0">
            <div class="flex items-center gap-2.5">
              <div class="size-12 rounded-50 bg-primary-200 dark:bg-dark-icon flex-center flex-shrink-0 dk-theme-card-square">
                <img
                  src="assets/images/icons/category/digital-mar.svg"
                  alt="icon"
                />
              </div>
              <div>
                <h6 class="leading-none text-heading font-semibold mb-2 line-clamp-1">
                  <a href="#" class="truncate">
                    Digital Marketing
                  </a>
                </h6>
                <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold">
                  90+ Courses
                </p>
              </div>
            </div>
            <div class="ms-auto mr-5">
              <div id="category-four"></div>
            </div>
            <a
              href="#"
              class="flex-center size-6 rounded-md bg-primary-200 dark:bg-dark-icon shrink-0 dk-theme-card-square"
            >
              <i class="ri-arrow-right-line text-gray-500 dark:text-dark-text text-[14px]"></i>
            </a>
          </li>
          <li class="flex-center-between first:pt-0">
            <div class="flex items-center gap-2.5">
              <div class="size-12 rounded-50 bg-primary-200 dark:bg-dark-icon flex-center flex-shrink-0 dk-theme-card-square">
                <img
                  src="assets/images/icons/category/bus-dev.svg"
                  alt="icon"
                />
              </div>
              <div>
                <h6 class="leading-none text-heading font-semibold mb-2 line-clamp-1">
                  <a href="#" class="truncate">
                    Business Dev...
                  </a>
                </h6>
                <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold">
                  90+ Courses
                </p>
              </div>
            </div>
            <div class="ms-auto mr-5">
              <div id="category-five"></div>
            </div>
            <a
              href="#"
              class="flex-center size-6 rounded-md bg-primary-200 dark:bg-dark-icon shrink-0 dk-theme-card-square"
            >
              <i class="ri-arrow-right-line text-gray-500 dark:text-dark-text text-[14px]"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PopularCategories;
