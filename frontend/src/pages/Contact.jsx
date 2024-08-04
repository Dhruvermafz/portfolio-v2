import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import ContactForm from "../components/Contact/ContactForm";
const Contact = () => {
  return (
    <section class="content-box-area mt-4">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
