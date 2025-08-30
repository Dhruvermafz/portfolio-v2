import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BiClipboard,
  BiTrophy,
  BiAward,
  BiCalendarCheck,
  BiBuilding,
} from "react-icons/bi";
import {
  RiHeartFill,
  RiDatabase2Line,
  RiShoppingBag3Line,
  RiChat3Line,
  RiUserAddLine,
  RiShieldLine,
  RiCheckLine,
  RiExchangeDollarLine,
  RiBankCardLine,
  RiBarChartGroupedLine,
} from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PageTitle from "../components/Common/PageTitle";
import {
  useGetAllAchievementsQuery,
  useGetAchievementByIdQuery,
} from "../api/achievementsApi";
import { useGetTodosQuery, useAddTodoMutation } from "../api/todoApi";
import { useGetUserByIdQuery } from "../api/userApi";
import { useGetAllCategoriesQuery } from "../api/categoryApi";
import { useGetAllProjectsQuery } from "../api/projectApi";
import { useGetAllContactsQuery } from "../api/contactApi";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Fetch authenticated user data
  const token = localStorage.getItem("authToken");
  const { user } = useSelector((state) => state.auth);
  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery("me", {
    skip: !token,
  });
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();
  const { data: projects, isLoading: projectsLoading } =
    useGetAllProjectsQuery();
  const { data: todos, isLoading: todosLoading } = useGetTodosQuery();
  const { data: queries, isLoading: queriesLoading } = useGetAllContactsQuery(); // Fetch queries
  const [addTodo] = useAddTodoMutation();

  const categoryImageMap = {
    technology: "assets/svg/technology.svg",
    Programming: "assets/svg/programming.svg",
    "MERN Stack": "assets/svg/mern.svg",
    MySQL: "assets/svg/mysql.svg",
    "Web Development": "assets/svg/webdev.svg",
    "React.Js": "assets/svg/react.svg",
    database: "assets/svg/database.svg",
  };

  // State for new task input
  const [newTask, setNewTask] = useState("");

  // Placeholder for contentClick
  const contentClick = () => {
    console.log("Content clicked");
  };

  // Placeholder for starting tour
  const startTour = () => {
    console.log("Starting tour");
  };

  // Update progress bar dynamically
  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar && userData) {
      const profileCompletion = userData.profileCompletion || 25;
      progressBar.style.width = `${profileCompletion}%`;
      progressBar.setAttribute("aria-valuenow", profileCompletion);
    }
  }, [userData]);

  // Handle task submission
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      try {
        // Send `content` instead of `title` to match backend schema
        await addTodo({ content: newTask, order: todos?.length || 0 }).unwrap();
        setNewTask("");
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  // Chart data for Revenue Report (Bar Chart)
  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  // Chart data for Earning (Bar Chart)
  const earningChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Earnings",
        data: [400, 300, 500, 200, 600, 700, 100],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Chart data for Visitors (Pie Chart)
  const visitorsChartData = {
    labels: ["New Visitors", "Returning Visitors"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // Handle loading state
  if (
    userLoading ||
    todosLoading ||
    categoriesLoading ||
    projectsLoading ||
    queriesLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Total Revenue */}
        <div className="col-sm-6 col-xxl-3 col-lg-6">
          <div className="main-tiles border-5 border-0 card-hover card o-hidden">
            <div className="custome-1-bg b-r-4 card-body">
              <div className="media align-items-center static-top-widget">
                <div className="media-body p-0">
                  <span className="m-0">Total Revenue</span>
                  <h4 className="mb-0 counter">
                    ${userData?.revenue || 6659}
                    <span className="badge badge-light-primary grow">
                      <RiHeartFill /> 8.5%
                    </span>
                  </h4>
                </div>
                <div className="align-self-center text-center">
                  <RiDatabase2Line />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="col-sm-6 col-xxl-3 col-lg-6">
          <div className="main-tiles border-5 card-hover border-0 card o-hidden">
            <div className="custome-2-bg b-r-4 card-body">
              <div className="media static-top-widget">
                <div className="media-body">
                  {" "}
                  <span className="m-0">Total Orders</span>
                  <h4 className="mb-0 counter">
                    {userData?.orders || 9856}
                    <span className="badge badge-light-danger grow">
                      <RiHeartFill /> 8.5%
                    </span>
                  </h4>
                </div>
                <div className="align-self-center text-center">
                  <RiShoppingBag3Line />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="col-sm-6 col-xxl-3 col-lg-6">
          <div className="main-tiles border-5 card-hover border-0 card o-hidden">
            <div className="custome-3-bg b-r-4 card-body">
              <div className="media static-top-widget">
                <div className="media-body p-0">
                  <span className="m-0">Total Projects</span>
                  <h4 className="mb-0 counter">
                    {projects?.length || 0}
                    <Link
                      to="/projects/add"
                      className="badge badge-light-secondary grow"
                    >
                      ADD NEW
                    </Link>
                  </h4>
                </div>
                <div className="align-self-center text-center">
                  <RiChat3Line />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="col-sm-6 col-xxl-3 col-lg-6">
          <div className="main-tiles border-5 card-hover border-0 card o-hidden">
            <div className="custome-4-bg b-r-4 card-body">
              <div className="media static-top-widget">
                <div className="media-body p-0">
                  <span className="m-0">Total Customers</span>
                  <h4 className="mb-0 counter">
                    {userData?.customers || "4.6k"}
                    <span className="badge badge-light-success grow">
                      <RiHeartFill /> 8.5%
                    </span>
                  </h4>
                </div>
                <div className="align-self-center text-center">
                  <RiUserAddLine />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Slider */}
        <div className="col-12">
          <div className="card o-hidden card-hover">
            <div className="card-header border-0 pb-1">
              <div className="card-header-title p-0">
                <h4>Category</h4>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="category-slider no-arrow">
                {categories?.map((category) => (
                  <div key={category._id}>
                    <div className="dashboard-category">
                      <Link
                        to={`/category/${category.name
                          .toLowerCase()
                          .replace(/ & /g, "-")}`}
                        className="category-image"
                      >
                        <img
                          src={
                            categoryImageMap[category.name] ||
                            "assets/svg/default.svg"
                          }
                          className="img-fluid"
                          alt={category.name}
                        />
                      </Link>
                      <Link
                        to={`/category/${category.name
                          .toLowerCase()
                          .replace(/ & /g, "-")}`}
                        className="category-name"
                      >
                        <h6>{category.name}</h6>
                      </Link>
                    </div>
                  </div>
                )) || <div>No categories available</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Report */}
        <div className="col-xl-6">
          <div className="card o-hidden card-hover">
            <div className="card-header border-0 pb-1">
              <div className="card-header-title">
                <h4>Revenue Report</h4>
              </div>
            </div>
            <div className="card-body p-0">
              <div id="report-chart">
                <Bar data={revenueChartData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Projects */}
        <div className="col-xl-6 col-md-12">
          <div className="card o-hidden card-card-header--2 px-0 pt-0">
            <div className="card-header-title">
              <h4>Top Projects</h4>
            </div>
            <div className="best-selling-box d-sm-flex d-none">
              <span>Sort By:</span>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdownMenuButton1">
                  Today
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Today</Dropdown.Item>
                  <Dropdown.Item href="#">This Week</Dropdown.Item>
                  <Dropdown.Item href="#">This Month</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="card-body p-0">
            <div>
              <div className="table-responsive">
                <table className="best-selling-table w-image table border-0">
                  <tbody>
                    {projects?.slice(0, 3).map((project, index) => (
                      <tr key={project._id}>
                        <td>
                          <div className="best-product-box">
                            <div className="product-image">
                              <img
                                src={
                                  project.mainImage ||
                                  "assets/images/project/default.png"
                                }
                                className="img-fluid"
                                alt={project.title}
                              />
                            </div>
                            <div className="product-name">
                              <h5>{project.title || "Untitled Project"}</h5>
                              <h6>{project.client || "Unknown Client"}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6>Services</h6>
                            <h5>{project.services || "N/A"}</h5>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6>Website</h6>
                            <h5>
                              <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.website ? "Visit" : "N/A"}
                              </a>
                            </h5>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6>GitHub</h6>
                            <h5>
                              <a
                                href={project.ghLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.ghLink ? "View" : "N/A"}
                              </a>
                            </h5>
                          </div>
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan="4">No projects available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Queries */}
        <div className="col-xl-6">
          <div className="card o-hidden card-hover">
            <div className="card-header card-header-top card-header--2 px-0 pt-0">
              <div className="card-header-title">
                <h4>Recent Queries</h4>
              </div>
              <div className="best-selling-box d-sm-flex d-none">
                <span>Sort By:</span>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdownMenuButton2">
                    Today
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Today</Dropdown.Item>
                    <Dropdown.Item href="#">This Week</Dropdown.Item>
                    <Dropdown.Item href="#">This Month</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="card-body p-0">
              <div>
                <div className="table-responsive">
                  <table className="best-selling-table table border-0">
                    <tbody>
                      {queries?.data?.slice(0, 4).map((query, index) => (
                        <tr key={query._id}>
                          <td>
                            <div className="best-product-box">
                              <div className="product-name">
                                <h5>{query.name}</h5>
                                <h6>{query.email}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="product-detail-box">
                              <h6>Subject</h6>
                              <h5>{query.subject}</h5>
                            </div>
                          </td>
                          <td>
                            <div className="product-detail-box">
                              <h6>Message</h6>
                              <h5>{query.message}</h5>
                            </div>
                          </td>
                          <td>
                            <div className="product-detail-box">
                              <h6>Date</h6>
                              <h5>
                                {new Date(
                                  query.createdAt || query._id
                                ).toLocaleDateString()}
                              </h5>
                            </div>
                          </td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan="4">No queries available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earning */}
        <div className="col-xl-6">
          <div className="card o-hidden card-hover">
            <div className="card-header border-0 mb-0">
              <div className="card-header-title">
                <h4>Earning</h4>
              </div>
            </div>
            <div className="card-body p-0">
              <div id="bar-chart-earning">
                <Bar data={earningChartData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="col-xxl-4 col-md-6">
          <div className="card o-hidden card-hover">
            <div className="card-header border-0">
              <div className="card-header-title">
                <h4>Transactions</h4>
              </div>
            </div>
            <div className="card-body pt-0">
              <div>
                <div className="table-responsive">
                  <table className="user-table transactions-table table border-0">
                    <tbody>
                      {userData?.transactions
                        ?.slice(0, 5)
                        .map((transaction, index) => (
                          <tr key={index} className={`td-color-${index % 5}`}>
                            <td>
                              <div className="transactions-icon">
                                {transaction.type === "Wallets" && (
                                  <RiShieldLine />
                                )}
                                {transaction.type === "Bank Transfer" && (
                                  <RiCheckLine />
                                )}
                                {transaction.type === "Paypal" && (
                                  <RiExchangeDollarLine />
                                )}
                                {transaction.type === "Mastercard" && (
                                  <RiBankCardLine />
                                )}
                                {transaction.type === "Transfer" && (
                                  <RiBarChartGroupedLine />
                                )}
                              </div>
                              <div className="transactions-name">
                                <h6>{transaction.type}</h6>
                                <p>{transaction.description}</p>
                              </div>
                            </td>
                            <td
                              className={
                                transaction.amount < 0 ? "lost" : "success"
                              }
                            >
                              {transaction.amount}
                            </td>
                          </tr>
                        )) || (
                        <tr>
                          <td colSpan="2">No transactions available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visitors */}
        <div className="col-xxl-4 col-md-6">
          <div className="h-100">
            <div className="card o-hidden card-hover">
              <div className="card-header border-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="card-header-title">
                    <h4>Visitors</h4>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="pie-chart">
                  <div id="pie-chart-visitors">
                    <Pie
                      data={visitorsChartData}
                      options={{ responsive: true }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* To Do List */}
        <div className="col-xxl-4 col-md-6">
          <div className="card o-hidden card-hover">
            <div className="card-header border-0">
              <div className="card-header-title">
                <h4>To Do List</h4>
              </div>
            </div>
            <div className="card-body pt-0">
              <ul className="to-do-list">
                {todos?.slice(0, 4).map((todo, index) => (
                  <li className="to-do-item" key={todo._id}>
                    <div className="form-check user-checkbox">
                      <input
                        className="checkbox_animated check-it"
                        type="checkbox"
                        checked={todo.completed}
                        id={`flexCheckDefault${index}`}
                        readOnly // Prevent direct interaction; add mutation for toggling if needed
                      />
                    </div>
                    <div className="to-do-list-name">
                      <strong>{todo.content}</strong>
                      <p>
                        {todo.createdAt
                          ? new Date(todo.createdAt).toLocaleDateString()
                          : "8 Hours"}
                      </p>
                    </div>
                  </li>
                )) || (
                  <li className="to-do-item">
                    <p>No tasks available</p>
                  </li>
                )}
                <li className="to-do-item">
                  <form className="row g-2" onSubmit={handleAddTask}>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        name="content"
                        placeholder="Enter Task Name"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                    </div>
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 h-100"
                      >
                        Add task
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
