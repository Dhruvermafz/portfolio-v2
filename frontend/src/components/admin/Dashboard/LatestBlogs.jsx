import React from "react";

const LatestBlogs = () => {
  return (
    <div class="col-span-full lg:col-span-6 3xl:col-span-4 card px-0">
      <div class="flex-center-between px-6 mb-7">
        <h6 class="card-title">Recent Support Tickets</h6>
        <a href="#" class="btn b-solid btn-primary-solid btn-sm">
          See all
        </a>
      </div>
      <div class="min-h-15 max-h-[350px] smooth-scrollbar" data-scrollbar>
        <ul class="divide-y divide-gray-200 dark:divide-dark-border-three space-y-5 *:pt-5 overflow-hidden px-6">
          <li class="flex items-center gap-2.5 first:pt-0">
            <a
              href="#"
              class="size-12 rounded-50 flex-shrink-0 overflow-hidden dk-theme-card-square"
            >
              <img src="assets/images/user/user-5.png" alt="user" />
            </a>
            <div>
              <h6 class="card-title text-[16px]">
                <a href="#">Robert Fox</a>
              </h6>
              <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold line-clamp-1 mt-1">
                Duis at consectetur lorem donec massa consectetur lorem donec...
              </p>
              <div class="leading-none text-xs text-gray-500 dark:text-dark-text-two mt-1.5">
                10 : 00 pm
              </div>
            </div>
          </li>
          <li class="flex items-center gap-2.5 first:pt-0">
            <a
              href="#"
              class="size-12 rounded-50 flex-shrink-0 overflow-hidden dk-theme-card-square"
            >
              <img src="assets/images/user/user-6.png" alt="user" />
            </a>
            <div>
              <h6 class="card-title text-[16px]">
                <a href="#">Emily Johnson</a>
              </h6>
              <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold line-clamp-1 mt-1">
                Vivamus suscipit tortor eget felis porttitor volutpat...
              </p>
              <div class="leading-none text-xs text-gray-500 dark:text-dark-text-two mt-1.5">
                11 : 15 am
              </div>
            </div>
          </li>
          <li class="flex items-center gap-2.5 first:pt-0">
            <a
              href="#"
              class="size-12 rounded-50 flex-shrink-0 overflow-hidden dk-theme-card-square"
            >
              <img src="assets/images/user/user-7.png" alt="user" />
            </a>
            <div>
              <h6 class="card-title text-[16px]">
                <a href="#">Michael Brown</a>
              </h6>
              <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold line-clamp-1 mt-1">
                Curabitur aliquet quam id dui posuere blandit...
              </p>
              <div class="leading-none text-xs text-gray-500 dark:text-dark-text-two mt-1.5">
                09 : 30 am
              </div>
            </div>
          </li>
          <li class="flex items-center gap-2.5 first:pt-0">
            <a
              href="#"
              class="size-12 rounded-50 flex-shrink-0 overflow-hidden dk-theme-card-square"
            >
              <img src="assets/images/user/user-8.png" alt="user" />
            </a>
            <div>
              <h6 class="card-title text-[16px]">
                <a href="#">Sarah Williams</a>
              </h6>
              <p class="leading-none text-xs text-gray-500 dark:text-dark-text-two font-semibold line-clamp-1 mt-1">
                Nulla quis lorem ut libero malesuada feugiat...
              </p>
              <div class="leading-none text-xs text-gray-500 dark:text-dark-text-two mt-1.5">
                02 : 45 pm
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LatestBlogs;
