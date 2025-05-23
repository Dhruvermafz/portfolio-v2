import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateContactMutation } from "../../api/contactApi";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sendMessage, { isLoading }] = useCreateContactMutation(); // Use the RTK Query mutation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendMessage(formData).unwrap(); // Send the message using RTK Query
      if (response) {
        toast.success("Your message has been sent successfully!", {
          position: "top-right",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error: " + error.message, {
        position: "top-right",
      });
      console.log(error.message);
    }
  };

  return (
    <div className="col-xl-8">
      <ToastContainer />
      <div className="card content-box-card">
        <div className="card-body portfolio-card contact-card">
          <div className="top-info">
            <div className="text">
              <h1 className="main-title">
                Let's 👋 <span>Work</span> Together
              </h1>
              <p>
                I'm here to help if you're searching for a Full Stack Developer
                to bring your idea to life or a software engineer to be on your
                valuable organization.
              </p>
            </div>
          </div>
          <div className="contact-area">
            <div className="leave-comments-area">
              <div className="comments-box">
                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className="row gx-3">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label">Name</label>
                        <input
                          name="name"
                          required
                          type="text"
                          className="form-control shadow-none"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          required
                          type="email"
                          className="form-control shadow-none"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-4">
                        <label className="form-label">Subject</label>
                        <input
                          name="subject"
                          required
                          type="text"
                          className="form-control shadow-none"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-4">
                        <label className="form-label">Message</label>
                        <textarea
                          name="message"
                          className="form-control shadow-none"
                          rows="4"
                          placeholder="Write your message........."
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button
                        className="submit-btn"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                        <svg
                          className="icon"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 11.6665V6.6665H12.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="contact-map-area">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6985.968887242623!2d76.5786088044883!3d28.898810357701475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85beaa791cab%3A0x512a3aaccbc43a7f!2sPartap%20Chowk%20St%2C%20Babra%20Mohalla%2C%20Rohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1723912441825!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
