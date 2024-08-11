import React from "react";

const SignIn = () => {
  return (
    <div class="main-content m-4">
      <div class="grid grid-cols-12 gap-y-7 sm:gap-7 card px-4 sm:px-10 2xl:px-[70px] py-15 lg:items-center lg:min-h-[calc(100vh_-_32px)] dk-theme-card-square">
        <div class="col-span-full lg:col-span-6">
          <div class="flex flex-col items-center justify-center gap-10 text-center">
            <div class="hidden sm:block">
              <img
                src="assets/images/loti/loti-auth.svg"
                alt="loti"
                class="group-[.dark]:hidden"
              />
              <img
                src="assets/images/loti/loti-auth-dark.svg"
                alt="loti"
                class="group-[.light]:hidden"
              />
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
              Sign In
            </h3>
            <p class="font-medium text-gray-500 dark:text-dark-text mt-4">
              Welcome Back! Log in to your account
            </p>
            <form
              action="https://template.codexshaper.com/admin/lms-hub/index.html"
              class="leading-none mt-8"
            >
              <div class="mb-2.5">
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
                <a
                  href="forgot-password.html"
                  class="text-xs leading-none text-primary-500 font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                class="btn b-solid btn-primary-solid w-full"
              >
                Sign In
              </button>
            </form>
            <div class="font-spline_sans text-gray-900 dark:text-dark-text leading-none text-center my-4">
              OR
            </div>
            <div class="flex items-center flex-col xl:flex-row gap-4 2xl:gap-5">
              <a
                href="#"
                class="btn b-outline-static btn-disable-outline w-full grow xl:w-auto"
              >
                <img src="assets/images/icons/google.svg" alt="icon" />
                <span class="shrink-0">Sign in with Google</span>
              </a>
              <a
                href="#"
                class="btn b-outline-static btn-disable-outline w-full grow xl:w-auto"
              >
                <img
                  src="assets/images/icons/apple.svg"
                  alt="icon"
                  class="dark:brightness-[3]"
                />
                <span class="shrink-0">Continue with Apple</span>
              </a>
            </div>
            <div class="text-gray-900 dark:text-dark-text font-medium leading-none mt-5">
              Don't have an account yet?
              <a href="sign-up.html" class="text-primary-500 font-semibold">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;