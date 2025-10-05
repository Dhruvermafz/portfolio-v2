const mongoose = require("mongoose");
const Book = require("../models/book"); // Adjust the path to your Book model

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;
    // Ensure required fields are provided
    if (!bookData.title || !bookData.authors || bookData.authors.length === 0) {
      return res
        .status(400)
        .json({ message: "Title and at least one author are required" });
    }
    const book = new Book(bookData);
    await book.save();
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

// Get all books with filtering, sorting, and pagination
exports.getBooks = async (req, res) => {
  try {
    const {
      title,
      author,
      language,
      series_name,
      is_series,
      status,
      shelf_status,
      page = 1,
      limit = 10,
      sort_by = "title",
      order = "asc",
    } = req.query;

    // Build the query object for filtering
    const query = {};

    // Filter by title (case-insensitive partial match)
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    // Filter by author (case-insensitive partial match on any author in the array)
    if (author) {
      query.authors = { $regex: author, $options: "i" };
    }

    // Filter by language (exact match)
    if (language) {
      query.language = language;
    }

    // Filter by series_name (exact match)
    if (series_name) {
      query.series_name = series_name;
    }

    // Filter by is_series (boolean)
    if (is_series !== undefined) {
      query.is_series = is_series === "true";
    }

    // Filter by status (exact match)
    if (status) {
      query.status = status;
    }

    // Filter by shelf_status (exact match)
    if (shelf_status) {
      query.shelf_status = shelf_status;
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sort = {};
    sort[sort_by] = order === "asc" ? 1 : -1;

    // Execute query
    const books = await Book.find(query).sort(sort).skip(skip).limit(limitNum);

    // Get total count for pagination metadata
    const total = await Book.countDocuments(query);

    res.status(200).json({
      message: "Books retrieved successfully",
      books,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving books", error: error.message });
  }
};
// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book retrieved successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving book", error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const bookData = req.body;
    // Ensure authors is an array and not empty if provided
    if (
      bookData.authors &&
      (!Array.isArray(bookData.authors) || bookData.authors.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: "Authors must be a non-empty array" });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { ...bookData, updated_at: Date.now() },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};
exports.filterBooks = async (req, res) => {
  try {
    // Fetch unique languages and series names concurrently
    const [languages, series] = await Promise.all([
      Book.distinct("language").exec(),
      Book.distinct("series_name").exec(),
    ]);

    // Filter out falsy values and sort for consistent display
    const filteredLanguages = languages.filter(Boolean).sort();
    const filteredSeries = series.filter(Boolean).sort();

    // Return response matching frontend expectations
    res.status(200).json({
      languages: filteredLanguages,
      series: filteredSeries,
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).json({
      message: "Error fetching filters",
      error: error.message || "Internal server error",
    });
  }
};
