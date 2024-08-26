import React from "react";
import SignIn from "../components/admin/Auth/SignIn";

const LoginIn = () => {
  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <SignIn />
        </div>
      </div>
    </section>
  );
};

export default LoginIn;
