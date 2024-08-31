const express = require("express");
const {
  createContact,
  getAllContacts,
  getSingleContact,
  deleteContact,
} = require("../controllers/contactController");

const contactRouter = express.Router();

contactRouter.post("/", createContact);
contactRouter.get("/:id", getSingleContact);
contactRouter.get("/", getAllContacts);
contactRouter.delete("/:id", deleteContact);
module.exports = contactRouter;
