const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      message: "Name, email, phone, and message are required fields.",
    });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      count: contacts.length,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to get contacts" });
  }
};

const getSingleContact = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact retrieved successfully",
      data: contact,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get the contact" });
  }
};
// @desc    Delete a contact query
// @route   DELETE /api/contact/:id
// @access  Private (admin)
const deleteContact = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await Contact.findById(queryId);

    if (!query) {
      return res
        .status(404)
        .json({ success: false, message: "Query not found" });
    }

    await query.remove();
    res
      .status(200)
      .json({ success: true, message: "Query deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete query" });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getSingleContact,
  deleteContact,
};
