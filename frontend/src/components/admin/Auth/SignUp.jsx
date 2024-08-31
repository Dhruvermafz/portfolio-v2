import React from "react";
import loti from "../../../assets/img/loti/loti-auth.svg";
const SignUp = () => {
  return (
    <div class="main-content m-4">
      <div class="grid grid-cols-12 gap-y-7 sm:gap-7 card px-4 sm:px-10 2xl:px-[70px] py-15 lg:items-center lg:min-h-[calc(100vh_-_32px)] dk-theme-card-square">
        <div class="col-span-full lg:col-span-6">
          <div class="flex flex-col items-center justify-center gap-10 text-center">
            <div class="hidden sm:block">
              <img src={loti} alt="loti" class="group-[.dark]:hidden" />
            </div>
            <div>
              <h3 class="text-xl md:text-[28px] leading-none font-semibold text-heading">
                Welcome back!
              </h3>
              <p class="font-medium text-gray-500 dark:text-dark-text mt-4 px-[10%]">
                Whether you're launching a stunning online store optimizing your
                our object-oriented
              </p>
            </div>
          </div>
        </div>

        <div class="col-span-full lg:col-span-6 w-full lg:max-w-[600px]">
          <div class="border border-form dark:border-dark-border p-5 md:p-10 rounded-20 md:rounded-30 dk-theme-card-square">
            <h3 class="text-xl md:text-[28px] leading-none font-semibold text-heading">
              Sign Up
            </h3>
            <p class="font-medium text-gray-500 dark:text-dark-text mt-4">
              Welcome! create on your account
            </p>
            <form
              action="https://template.codexshaper.com/admin/lms-hub/two-step.html"
              class="leading-none mt-8"
            >
              <div class="mb-2.5">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Debra Holt"
                  required
                  class="form-input px-4 py-3.5 rounded-lg"
                />
              </div>
              <div class="mt-5">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="debra.holt@example.com"
                  required
                  class="form-input px-4 py-3.5 rounded-lg"
                />
              </div>
              <div class="mt-5">
                <label for="password" class="form-label">
                  Password
                </label>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    class="form-input px-4 py-3.5 rounded-lg"
                  />
                  <label
                    for="toggleInputType"
                    class="size-8 rounded-md flex-center hover:bg-gray-200 dark:hover:bg-dark-icon foucs:bg-gray-200 dark:foucs:bg-dark-icon position-center left-[95%]"
                  >
                    <input
                      type="checkbox"
                      id="toggleInputType"
                      class="inputTypeToggle peer/it"
                      hidden
                    />
                    <i class="ri-eye-off-line text-gray-500 dark:text-dark-text peer-checked/it:before:content-['\ecb5']"></i>
                  </label>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3 mb-7">
                <div class="flex items-center gap-1 select-none">
                  <input type="checkbox" name="remember-me" id="rememberMe" />
                  <label
                    for="rememberMe"
                    class="font-spline_sans text-sm leading-none text-gray-900 dark:text-dark-text cursor-pointer"
                  >
                    Remember Me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                class="btn b-solid btn-primary-solid w-full"
              >
                Sign Up
              </button>
            </form>

            <div class="text-gray-900 dark:text-dark-text font-medium leading-none mt-5">
              Have an account?
              <a href="sign-in.html" class="text-primary-500 font-semibold">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
