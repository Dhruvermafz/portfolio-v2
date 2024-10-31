import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import axios from "axios"; // For API requests

const TechnologiesIWorked = () => {
  const [twitterFollowers, setTwitterFollowers] = useState(0);
  const [linkedinConnections, setLinkedinConnections] = useState(0);
  const [githubRepos, setGithubRepos] = useState(0);
  const [githubFollowers, setGithubFollowers] = useState(0);
  const [totalGithubRepos, setTotalGithubRepos] = useState(0); // Store total repo count
  const [leetcodeSolved, setLeetcodeSolved] = useState(0); // LeetCode state

  // Fetch Twitter followers using Twitter API
  useEffect(() => {
    const fetchTwitterFollowers = async () => {
      try {
        const response = await fetch(
          `https://api.twitter.com/2/users/by/thenerdy_guy/thnerdy_guy?user.fields=public_metrics`,
          {
            headers: {
              Authorization: `Bearer YOUR_TWITTER_BEARER_TOKEN`,
            },
          }
        );
        const data = await response.json();
        setTwitterFollowers(data.data.public_metrics.followers_count);
      } catch (error) {
        console.error("Failed to fetch Twitter followers:", error);
      }
    };

    fetchTwitterFollowers();
  }, []);

  // Fetch LinkedIn connections (requires OAuth 2.0 and LinkedIn API)
  useEffect(() => {
    const fetchLinkedInConnections = async () => {
      // Replace this with your LinkedIn API call logic
      try {
        const response = await fetch("/your-linkedin-api-endpoint");
        const data = await response.json();
        setLinkedinConnections(data.numConnections); // Example of setting connection count
      } catch (error) {
        console.error("Failed to fetch LinkedIn connections:", error);
      }
    };

    fetchLinkedInConnections();
  }, []);

  // Fetch GitHub repos and followers using GitHub API
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [reposResponse, userResponse] = await Promise.all([
          fetch("https://api.github.com/users/Dhruvermafz/repos"),
          fetch("https://api.github.com/users/Dhruvermafz"),
        ]);

        const reposData = await reposResponse.json();
        const userData = await userResponse.json();

        setGithubFollowers(userData.followers);
        setTotalGithubRepos(userData.public_repos); // Total public repos count
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      }
    };

    fetchGitHubData();
  }, []);

  // Fetch LeetCode solved problems
  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/thenerdy_guy/`
        );
        setLeetcodeSolved(response.data.totalSolved);
      } catch (error) {
        console.error("Failed to fetch LeetCode data:", error);
      }
    };

    fetchLeetCodeData();
  }, []);

  return (
    <div className="services-area mt-24">
      <div className="row g-4">
        <div className="col-xl-8">
          <div className="card services-card">
            <div className="card-body">
              <h3 className="card-title">Connections I build</h3>
              <div className="services-main mt-24">
                <div className="row g-4">
                  <div className="col-md-3 col-sm-6 col-6">
                    <div className="services-item text-center">
                      <div className="image">
                        <FaTwitter style={{ fontSize: "2rem" }} />
                      </div>
                      <div className="text">
                        <h3 className="title">
                          15 Followers{" "}
                          <a
                            className="link-btn"
                            href="https://twitter.com/thenerdy_guy"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Twitter
                            <FaArrowRight />
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-6 col-6">
                    <div className="services-item text-center">
                      <div className="image">
                        <FaLinkedin style={{ fontSize: "2rem" }} />
                      </div>
                      <div className="text">
                        <h3 className="title">
                          764 Connections{" "}
                          <a
                            className="link-btn"
                            href="https://linkedin.com/in/Dhruvermafz"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit LinkedIn
                            <FaArrowRight />
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-6 col-6">
                    <div className="services-item text-center">
                      <div className="image">
                        <FaGithub style={{ fontSize: "2rem" }} />
                      </div>
                      <div className="text">
                        <h3 className="title">
                          {totalGithubRepos} Repos {/* Display total repos */}
                          <a
                            className="link-btn"
                            href="https://github.com/Dhruvermafz"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit GitHub
                            <FaArrowRight />
                          </a>
                        </h3>
                        <p>{githubFollowers} Followers</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-6 col-6">
                    <div className="services-item text-center">
                      <div className="image">
                        <SiLeetcode style={{ fontSize: "2rem" }} />
                      </div>
                      <div className="text">
                        <h3 className="title">
                          {leetcodeSolved} Problems Solved{" "}
                          <a
                            className="link-btn"
                            href="https://leetcode.com/thenerdy_guy/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit LeetCode
                            <FaArrowRight />
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* You can add more sections or technologies here */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="card lets-talk-together-card">
            <div class="card-body">
              <div class="scrolling-info">
                <div class="slider-item">
                  <p>
                    Available For Hire 🚀 Crafting Digital Experiences 🎨
                    Available For Hire 🚀 Crafting Digital Experiences 🎨
                  </p>
                </div>
              </div>
              <h3 class="card-title">
                Let's👋
                <span class="d-block">Work Together</span>
              </h3>
              <a class="link-btn" href="contact.html">
                {" "}
                Let's Talk
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesIWorked;
