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
                    <div class="col-md-6">
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
                    <div class="col-md-6">
                      <div class="mb-4">
                        <label class="form-label">Budget</label>
                        <select
                          name="budget"
                          required
                          class="form-select shadow-none"
                        >
                          <option disabled selected>
                            Select budget...
                          </option>
                          <option value="$5000">$5000</option>
                          <option value="$5000 - $1000">$5000 - $10000</option>
                          <option value="$10000 - $2000">
                            $10000 - $20000
                          </option>
                          <option value="$20000">$20000+</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="mb-4">
                        <label class="form-label">Comment</label>
                        <textarea
                          name="message"
                          class="form-control shadow-none"
                          rows="4"
                          placeholder="Type details about your inquiry"
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280012016!2d-74.14448732737499!3d40.69763123331177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1711832776336!5m2!1sen!2sbd"
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