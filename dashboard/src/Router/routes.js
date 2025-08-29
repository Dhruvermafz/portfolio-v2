import {
  RiDashboardLine,
  RiArticleLine,
  RiFolderLine,
  RiQuestionAnswerLine,
  RiFolderAddLine,
  RiFolderOpenLine,
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
const masterRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <RiDashboardLine />,
    isSidebarActive: true,
    element: <Dashboard />,
    submenu: [],
  },
  {
    path: "/blogs",
    element: <Blogs />,
    name: "Blogs",
    icon: <RiArticleLine />,
    isSidebarActive: true,
    submenu: [],
  },
  {
    path: "/blogs/create",
    element: <CreateBlog />,
    name: "Blogs",
    isSidebarActive: false,
    submenu: [],
  },
  {
    path: "/blogs/:_id/edit",
    element: <CreateBlog />,
    name: "Blogs",
    isSidebarActive: false,
    submenu: [],
  },
  {
    path: "/category",
    element: <Categories />,
    name: "Categories",
    icon: <RiFolderLine />,
    isSidebarActive: true,
    submenu: [],
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
    path: "/projects-list",
    element: <Projects />,
    name: "Projects",
    icon: <RiFolderOpenLine />,
    isSidebarActive: true,
    submenu: [],
  },
  {
    path: "/project-add",
    element: <CreateProject />,
    name: "Add Projects",
    icon: <RiFolderAddLine />,
    isSidebarActive: false,
    submenu: [],
  },
  {
    path: "/project-edit/:_id",
    element: <CreateProject />,
    name: "Edit Projects",
    isSidebarActive: false,
    submenu: [],
  },
  {
    path: "/achievements",
    element: <Achievements />,
    name: "Achievements",
    icon: <RiMedalLine />,
    isSidebarActive: true,
    submenu: [],
  },
  {
    path: "/todo-list",
    element: <TodoList />,
    name: "ToDo",
    icon: <RiTodoLine />,
    isSidebarActive: true,
    submenu: [],
  },
  {
    path: "/login",
    element: <Login />,
    name: "Login",
    isSidebarActive: false,
    icon: <RiLoginBoxFill />,
    submenu: [],
  },
  {
    path: "/signup",
    element: <Signup />,
    name: "Signup",
    isSidebarActive: false,
    icon: <RiLoginBoxFill />,
    submenu: [],
  },
];

export default masterRoutes;
