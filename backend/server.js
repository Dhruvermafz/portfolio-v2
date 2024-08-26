require("dotenv").config();
const express = require("express");
const loginRoute = require("./router/loginRoute");
const usersRoute = require("./router/usersRoute");
const categoryRoute = require("./router/categoryRoute");
const postsRoute = require("./router/postsRoute");

const app = express();

app.use(express.json());

app.use("/login", loginRoute);
app.use("/user", usersRoute);
app.use("/categories", categoryRoute);
app.use("/post", postsRoute);

const port = process.env.API_PORT || 3000;

app.get("/", (_request, response) => {
  response.send();
});

app.listen(port, () => console.log("SERVER IS WORKING ON: ", port));
