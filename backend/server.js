require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const cors = require("cors");
const swaggerUi = require("swagger-ui-express"); // Import swagger-ui-express
const swaggerDocument = require("./swagger.json"); // Import swagger spec
const path = require("path"); // For serving static files
const todoRoutes = require("./router/todoRoutes");
// Import routes
const usersRoute = require("./router/usersRoute");
const categoryRoute = require("./router/categoryRoute");
const postsRoute = require("./router/postsRoute");
const contactRoute = require("./router/contactRouter");
const projectRoute = require("./router/projectRoute");
const achivementRoute = require("./router/achivementRoute");
const connectDB = require("./database/connectDb");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://dhruvermafz.vercel.app",
      "http://192.168.221.143:3000",
      "https://dhruvermafz.in",
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// Serve static files from public_html
app.use(express.static(path.join(__dirname, "public_html")));

// Set up Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set up routes
app.use("/user", usersRoute);
app.use("/categories", categoryRoute);
app.use("/post", postsRoute);
app.use("/contact", contactRoute);
app.use("/projects", projectRoute);
app.use("/achievements", achivementRoute);
app.use("/api/todos", todoRoutes);
// Define a simple route
app.get("/", (_request, response) => {
  response.sendFile(path.join(__dirname, "public_html", "index.html"));
});

// Define the port
const port = process.env.API_PORT || 8000;

connectDB();

// Start the server
app.listen(port, () => console.log("SERVER IS WORKING ON: ", port));
