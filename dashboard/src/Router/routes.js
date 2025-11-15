import {
  RiHomeLine,
  RiListCheck2,
  RiUser3Line,
  RiPriceTag3Line,
  RiArticleLine,
  RiQuestionAnswerLine,
  RiFolderOpenLine,
  RiFolderAddLine,
  RiMedalLine,
  RiTodoLine,
  RiLoginBoxFill,
} from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";
import CreateBlog from "../pages/CreateBlog";
import CreateProject from "../components/Projects/CreateProject";
import Dashboard from "../pages/Dashboard";
import Blogs from "../pages/Blogs";
import Categories from "../pages/Categories";
import Queries from "../pages/Queries";
import Projects from "../pages/Projects";
import Achievements from "../pages/Achievements";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MediaWrapper from "../components/Media/MediaWrapper";
import { elements } from "chart.js";
import Error404 from "../pages/Error404";
import AllUsers from "../pages/AllUsers";
import AddNewUser from "../pages/AddNewUser";
import Profile from "../pages/Profile";
import Books from "../pages/Books";
import BookForm from "../components/Books/BookForm";
import SeriesDetails from "../pages/SeriesDetails";
import AuthorDetails from "../pages/AuthorDetails";
const masterRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <RiHomeLine />,
    isSidebarActive: true,
    element: <Dashboard />,
  },
  {
    path: "/category/list",
    name: "Category",
    icon: <RiListCheck2 />,
    isSidebarActive: true,
    element: <Categories />,
  },
  {
    path: "/users/list",
    name: "All Users",
    icon: <RiUser3Line />,
    element: <AllUsers />,
    isSidebarActive: true,
  },
  {
    path: "/media",
    name: "Media",
    icon: <RiPriceTag3Line />,
    isSidebarActive: true,
    element: <MediaWrapper />,
  },
  {
    path: "/blogs/list",
    name: "Blogs",
    icon: <RiArticleLine />,
    isSidebarActive: true,
    element: <Blogs />,
  },
  {
    path: "/boookshelf",
    name: "Bookshelf",
    icon: <GiBookshelf />,
    isSidebarActive: true,
    element: <Books />,
  },
  {
    path: "/contact",
    element: <Queries />,
    name: "Queries",
    icon: <RiQuestionAnswerLine />,
    isSidebarActive: true,
  },
  {
    path: "/projects/list",
    name: "Projects",
    icon: <RiFolderOpenLine />,
    isSidebarActive: true,
    element: <Projects />,
  },
  {
    path: "/achievements/list",
    element: <Achievements />,
    name: "Achievements",
    icon: <RiMedalLine />,
    isSidebarActive: true,
  },

  {
    path: "#",
    name: "Auth",
    isSidebarActive: false,
    icon: <RiLoginBoxFill />,
    submenu: [
      {
        path: "/users/add", // Fixed typo
        name: "Add New User",
        element: <AddNewUser />,
        isSidebarActive: false,
      },
      {
        path: "/users/edit/:id", // Fixed typo
        name: "Edit User",
        element: <AddNewUser />,
        isSidebarActive: false,
      },
      {
        path: "/blogs/create",
        element: <CreateBlog />,
        name: "Create Blog",
        isSidebarActive: false,
      },
      {
        path: "/blogs/:_id/edit",
        element: <CreateBlog />,
        name: "Edit Blog",
        isSidebarActive: false,
      },
      {
        path: "/book/add",
        name: "Add Book",
        icon: <GiBookshelf />,
        isSidebarActive: true,
        element: <BookForm />,
      },
      {
        path: "/book/:id/edit",
        name: "Edit Book",
        icon: <GiBookshelf />,
        isSidebarActive: false,
        element: <BookForm />,
      },
      {
        path: "/series/:slug",
        name: "Series",
        icon: <GiBookshelf />,
        isSidebarActive: false,
        element: <SeriesDetails />,
      },
      {
        path: "/authors/:slug",
        name: "Author",
        icon: <GiBookshelf />,
        isSidebarActive: false,
        element: <AuthorDetails />,
      },
      {
        path: "/projects/add",
        element: <CreateProject />,
        name: "Add Project",
        icon: <RiFolderAddLine />,
        isSidebarActive: false,
      },
      {
        path: "/projects/:_id/edit",
        element: <CreateProject />,
        name: "Edit Project",
        isSidebarActive: false,
      },
      {
        path: "/login",
        element: <Login />,
        name: "Login",
        isSidebarActive: false,
        icon: <RiLoginBoxFill />,
      },
      {
        path: "/signup",
        element: <Signup />,
        name: "Signup",
        isSidebarActive: false,
        icon: <RiLoginBoxFill />,
      },
      {
        path: "/*",
        element: <Error404 />,
        name: "Error",
        isSidebarActive: false,
        icon: <RiLoginBoxFill />,
      },
      {
        path: "/u/:id",
        element: <Profile />,
        name: "Profile",
        isSidebarActive: false,
        icon: <RiLoginBoxFill />,
      },
    ],
  },
];

export default masterRoutes;
