const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: "Name, email, subject, and message are required fields.",
    });
  }

  try {
    // Create a new contact object
    const newContact = new Contact({
      name,
      email,
      subject, // Replaced 'phone' with 'subject'
      message,
    });

    // Save the new contact to the database
    await newContact.save();

    // Return a success response
    res.status(201).json({ message: "Contact created successfully" });
  } catch (err) {
    console.log(err);
    // Return a server error response
    res.status(500).json({ message: "Failed to create contact" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const contacts = await Contact.find();

    // Return a success response with the contacts
    res.status(200).json({
      success: true,
      count: contacts.length,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (err) {
    console.log(err);
    // Return a server error response
    res.status(500).json({ success: false, message: "Failed to get contacts" });
  }
};

const getSingleContact = async (req, res) => {
  const id = req.params.id;

  try {
    // Find a contact by ID
    const contact = await Contact.findById(id);

    // If contact is not found, return a 404 response
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // Return a success response with the contact
    res.status(200).json({
      success: true,
      message: "Contact retrieved successfully",
      data: contact,
    });
  } catch (err) {
    console.log(err);
    // Return a server error response
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

    // Find a contact by ID
    const query = await Contact.findById(queryId);

    // If contact is not found, return a 404 response
    if (!query) {
      return res
        .status(404)
        .json({ success: false, message: "Query not found" });
    }

    // Remove the contact from the database
    await query.remove();

    // Return a success response
    res
      .status(200)
      .json({ success: true, message: "Query deleted successfully" });
  } catch (err) {
    console.error(err);
    // Return a server error response
    res.status(500).json({ success: false, message: "Failed to delete query" });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getSingleContact,
  deleteContact,
};
