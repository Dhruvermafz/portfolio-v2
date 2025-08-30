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
import CreateBlog from "../components/Blogs/CreateBlog";
import CreateProject from "../components/Projects/CreateProject";
import TodoList from "../components/ToDo/TodoList";
import Dashboard from "../pages/Dashboard";
import Blogs from "../pages/Blogs";
import Categories from "../pages/Categories";
import Queries from "../pages/Queries";
import Projects from "../pages/Projects";
import Achievements from "../pages/Achievements";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MediaWrapper from "../components/Media/MediaWrapper";

const masterRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <RiHomeLine />,
    isSidebarActive: true,
    element: <Dashboard />,
    submenu: [],
  },
  {
    path: "#",
    name: "Category",
    icon: <RiListCheck2 />,
    isSidebarActive: true,
    submenu: [
      {
        path: "/category/list",
        name: "Category List",
        element: <Categories />,
        isSidebarActive: true,
      },
    ],
  },
  {
    path: "#",
    name: "Users",
    icon: <RiUser3Line />,
    isSidebarActive: true,
    submenu: [
      {
        path: "/users/list",
        name: "All Users",

        isSidebarActive: true,
      },
      {
        path: "/users/add-new-user", // Fixed typo
        name: "Add New User",

        isSidebarActive: true,
      },
    ],
  },
  {
    path: "/media",
    name: "Media",
    icon: <RiPriceTag3Line />,
    isSidebarActive: true,
    element: <MediaWrapper />,
    submenu: [],
  },
  {
    path: "#",
    name: "Blogs",
    icon: <RiArticleLine />,
    isSidebarActive: true,
    submenu: [
      {
        path: "/blogs/list",
        element: <Blogs />,
        name: "Blogs",
        icon: <RiArticleLine />,
        isSidebarActive: true,
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
    ],
  },
  {
    path: "/contact",
    element: <Queries />,
    name: "Queries",
    icon: <RiQuestionAnswerLine />,
    isSidebarActive: true,
    submenu: [],
  },
  {
    path: "#",
    name: "Projects",
    icon: <RiFolderOpenLine />,
    isSidebarActive: true,
    submenu: [
      {
        path: "/projects/list",
        element: <Projects />,
        name: "Projects",
        icon: <RiFolderOpenLine />,
        isSidebarActive: true,
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
    ],
  },
  {
    path: "/achievements/list",
    element: <Achievements />,
    name: "Achievements",
    icon: <RiMedalLine />,
    isSidebarActive: true,
    submenu: [],
  },
  {
    path: "/todo/list",
    element: <TodoList />,
    name: "ToDo",
    icon: <RiTodoLine />,
    isSidebarActive: true,
    submenu: [],
  },
  {
    path: "#",
    name: "Auth",
    isSidebarActive: false,
    icon: <RiLoginBoxFill />,
    submenu: [
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
    ],
  },
];

export default masterRoutes;
