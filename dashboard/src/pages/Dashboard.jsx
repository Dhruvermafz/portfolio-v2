import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Added for navigation
import { useSelector } from "react-redux"; // To access auth state
import { BiClipboard } from "react-icons/bi";
import { RiHeartFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiTrophy, BiAward, BiCalendarCheck, BiBuilding } from "react-icons/bi"; // Replaced Bootstrap Icons with react-icons/bi
import PageTitle from "../components/Common/PageTitle";
import {
  useGetAllAchievementsQuery,
  useGetAchievementByIdQuery,
} from "../api/achievementsApi";
import { useGetTodosQuery } from "../api/todoApi";
import { useGetUserByIdQuery } from "../api/userApi";
const Dashboard = () => {
  // Fetch authenticated user data
  const token = localStorage.getItem("authToken");
  const { user } = useSelector((state) => state.auth); // Get user from Redux
  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery("me", {
    skip: !token,
  });

  // Fetch achievements for Level and Rank
  const { data: achievements, isLoading: achievementsLoading } =
    useGetAllAchievementsQuery();
  const { data: topAchievement } = useGetAchievementByIdQuery(
    achievements?.[0]?.id,
    { skip: !achievements?.[0]?.id }
  );

  // Fetch tasks for Tasks Done
  const { data: todos, isLoading: todosLoading } = useGetTodosQuery();

  // Placeholder for contentClick
  const contentClick = () => {
    console.log("Content clicked");
    // Implement content click logic if needed
  };

  // Placeholder for starting tour
  const startTour = () => {
    console.log("Starting tour");
    // Implement tour logic (e.g., using a library like react-joyride)
  };

  // Update progress bar dynamically (example: based on profile completion)
  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar && userData) {
      const profileCompletion = userData.profileCompletion || 25; // Example: Assume API returns profile completion percentage
      progressBar.style.width = `${profileCompletion}%`;
      progressBar.setAttribute("aria-valuenow", profileCompletion);
    }
  }, [userData]);

  return (
    <main className="adminuiux-content has-sidebar" onClick={contentClick}>
      <PageTitle />

      <div className="container mt-3" id="main-content">
        <div className="row gx-3 gx-lg-4 align-items-center">
          <div className="col-12 col-md mb-3 mb-lg-4">
            <p className="h2 fw-normal mb-0">Welcome,</p>
            <h1 className="display-3 fw-medium text-gradient">
              {userLoading ? "Loading..." : userData?.name || "AdminUIUX"}
            </h1>
          </div>

          <div className="col-12 col-md-auto col-xl-4 col-xxl-3 ms-auto align-self-center">
            <div className="row gx-3 gx-lg-4 mb-3 mb-lg-4">
              <div className="col col-md col-lg text-center">
                <BiTrophy className="h5 avatar avatar-50 bg-theme-r-gradient theme-purple text-white rounded-circle mb-2" />
                <h3 className="increamentcount mb-0">
                  {achievementsLoading ? "..." : topAchievement?.level || 2586}
                </h3>
                <p className="small text-secondary text-truncated">Level 3</p>
              </div>
              <div className="col col-md col-lg text-center">
                <BiAward className="h5 avatar avatar-50 bg-theme-r-gradient theme-orange text-white rounded-circle mb-2" />
                <h3 className="increamentcount mb-0">
                  {achievementsLoading ? "..." : topAchievement?.rank || 1583}
                </h3>
                <p className="small text-secondary text-truncated">Your Rank</p>
              </div>
              <div className="col col-md col-lg text-center">
                <BiClipboard className="h5 avatar avatar-50 bg-theme-r-gradient theme-teal text-white rounded-circle mb-2" />
                <h3 className="increamentcount mb-0">
                  {todosLoading ? "..." : todos?.length || 1356}
                </h3>
                <p className="small text-secondary text-truncated">
                  Tasks Done
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-3 gx-lg-4">
          <div className="col-12 col-md-6 col-lg-6 col-xxl-3">
            <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div className="card-body">
                <div className="row gx-3 gx-lg-4 align-items-center">
                  <div className="col-auto">
                    <div className="position-relative">
                      <div
                        id="circleprogressblue"
                        className="avatar avatar-60"
                      ></div>
                      <div className="avatar avatar-40 h5 bg-theme-1-subtle text-theme-1 rounded-circle position-absolute top-50 start-50 translate-middle">
                        <BiCalendarCheck />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <p className="text-secondary small mb-1">Task Completed</p>
                    <h5>
                      {todosLoading ? "..." : `${todos?.length || 0}`}
                      <small> Tasks</small>
                    </h5>
                  </div>
                  <div className="col-auto">
                    <div className="dropdown d-inline-block">
                      <Link
                        className="text-secondary no-caret"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-display="static"
                        role="button"
                        to="#"
                      >
                        <BsThreeDotsVertical />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link className="dropdown-item" to="/todo-list">
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            Move
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-danger" to="#">
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xxl-3">
            <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div className="card-body">
                <div className="row gx-3 gx-lg-4 align-items-center">
                  <div className="col-auto">
                    <div className="position-relative">
                      <div
                        id="circleprogressyellow"
                        className="avatar avatar-60"
                      ></div>
                      <div className="avatar avatar-40 h5 bg-theme-1-subtle text-theme-1 theme-yellow rounded-circle position-absolute top-50 start-50 translate-middle">
                        <BiBuilding />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <p className="text-secondary small mb-1">Construction</p>
                    <h5>
                      12550<small>USD</small>
                    </h5>
                  </div>
                  <div className="col-auto">
                    <div className="dropdown d-inline-block">
                      <Link
                        className="text-secondary no-caret"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-display="static"
                        role="button"
                        to="#"
                      >
                        <BsThreeDotsVertical />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link className="dropdown-item" to="/projects-list">
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            Move
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-danger" to="#">
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xxl-3">
            <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div className="card-body">
                <div className="row gx-3 gx-lg-4 align-items-center">
                  <div className="col-auto">
                    <div className="avatar avatar-60 h5 bg-theme-1-subtle text-theme-1 theme-red rounded-circle">
                      <RiHeartFill />
                    </div>
                  </div>
                  <div className="col">
                    <p className="text-secondary small mb-1">Event Joined</p>
                    <h5>
                      1525<small>k</small>
                    </h5>
                  </div>
                  <div className="col-auto">
                    <div className="dropdown d-inline-block">
                      <Link
                        className="text-secondary no-caret"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-display="static"
                        role="button"
                        to="#"
                      >
                        <BsThreeDotsVertical />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link className="dropdown-item" to="#">
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            Move
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-danger" to="#">
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
