const mongoose = require("mongoose");
const Book = require("../models/book"); // Adjust path to your Book model

// Book data from the provided dataset
const books = require("./library.json");

// MongoDB connection
const connectDB = require("../database/connectDb");
// Seeder function
const seedBooks = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing books (optional, comment out if you want to keep existing data)
    // await Book.deleteMany({});
    // console.log('Existing books cleared');

    // Insert books, checking for duplicates
    let insertedCount = 0;
    let skippedCount = 0;

    for (const bookData of books) {
      const existingBook = await Book.findOne({
        title: bookData.title,
        authors: bookData.authors,
      });

      if (existingBook) {
        console.log(
          `Book already exists: ${bookData.title} by ${bookData.authors.join(
            ", "
          )}`
        );
        skippedCount++;
        continue;
      }

      const book = new Book(bookData);
      await book.save();
      console.log(`Inserted: ${bookData.title}`);
      insertedCount++;
    }

    console.log(
      `Seeding completed: ${insertedCount} books inserted, ${skippedCount} books skipped (duplicates)`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error seeding books:", error);
    process.exit(1);
  }
};

// Run the seeder
seedBooks();
