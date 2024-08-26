import React from "react";

const ContactForm = () => {
  return (
    <div class="col-xl-8">
      <div class="card content-box-card">
        <div class="card-body portfolio-card contact-card">
          <div class="top-info">
            <div class="text">
              <h1 class="main-title">
                Let's 👋 <span>Work</span> Together
              </h1>
              <p>
                I'm here to help if you're searching for a product designer to
                bring your idea to life or a design partner to help take your
                business to the next level.
              </p>
            </div>
          </div>
          <div class="contact-area">
            <div class="leave-comments-area">
              <div class="comments-box">
                <form
                  id="contact-form"
                  action="https://marveltheme.com/tf/html/bentofolio-html/assets/mail.php"
                  method="POST"
                >
                  <div class="row gx-3">
                    <div class="col-md-6">
                      <div class="mb-4">
                        <label class="form-label">Name</label>
                        <input
                          name="name"
                          required
                          type="text"
                          class="form-control shadow-none"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-4">
                        <label class="form-label">Email</label>
                        <input
                          name="email"
                          required
                          type="email"
                          class="form-control shadow-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="mb-4">
                        <label class="form-label">Subject</label>
                        <input
                          name="subject"
                          required
                          type="text"
                          class="form-control shadow-none"
                          placeholder="Subject"
                        />
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="mb-4">
                        <label class="form-label">Message</label>
                        <textarea
                          name="message"
                          class="form-control shadow-none"
                          rows="4"
                          placeholder="Write your message........."
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <button class="submit-btn" type="submit">
                        Send Message
                        <svg
                          class="icon"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 11.6665V6.6665H12.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
                <p class="ajax-response mb-0"></p>
              </div>
            </div>
            <div class="contact-map-area">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6985.968887242623!2d76.5786088044883!3d28.898810357701475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85beaa791cab%3A0x512a3aaccbc43a7f!2sPartap%20Chowk%20St%2C%20Babra%20Mohalla%2C%20Rohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1723912441825!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
