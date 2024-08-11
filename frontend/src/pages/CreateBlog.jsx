import React from "react";
import CreateBlog from "../components/admin/Blogs/CreateBlog";
import ProfileCard from "../components/Cards/ProfileCard";
const CreateBlogPage = () => {
  return (
    <section class="content-box-area mt-4">
      <div class="container">
        <div class="row g-4">
          <CreateBlog />
        </div>
      </div>
    </section>
  );
};

export default CreateBlogPage;
