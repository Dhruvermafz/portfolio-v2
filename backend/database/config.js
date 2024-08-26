require("dotenv").config();

// Determine the current environment
const environment = process.env.NODE_ENV || "test";

// Define suffixes for different environments
const suffix = {
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

// Mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: `${process.env.MONGO_DB_NAME || "blogs-api"}${
    suffix[environment] || suffix.test
  }`, // Add suffix based on environment
};

// Construct the MongoDB URI
const mongoUri = `mongodb://${process.env.MONGO_HOST || "localhost"}:${
  process.env.MONGO_PORT || "27017"
}`;

// Export configuration based on environment
module.exports = {
  development: {
    uri: mongoUri,
    options,
  },
  test: {
    uri: mongoUri,
    options,
  },
};
