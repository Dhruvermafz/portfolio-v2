const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: null },
  authors: { type: [String], required: true },
  publisher: { type: String, default: null },
  published_date: { type: Date, default: null },
  description: { type: String, default: null },
  image_url: { type: String, default: null },
  status: {
    type: String,
    enum: [
      "unread",
      "not_even_half",
      "mid_half",
      "more_than_half",
      "completed",
    ],
    default: "unread",
  },
  shelf_status: {
    type: String,
    enum: ["idle", "orphaned", "taken"],
    default: "idle",
  },
  is_series: { type: Boolean, default: false },
  series_name: { type: String, default: null },
  series_part: { type: Number, default: null },
  series_total_parts: { type: Number, default: null },
  suggestions: { type: [String], default: [] },
  isbn: { type: String, default: null },
  language: { type: String, default: null },
  page_count: { type: Number, default: null },
  genres: { type: [String], default: [] },
  custom_notes: { type: String, default: null },
  rating: { type: Number, min: 0, max: 5, default: null },
  location: { type: String, default: null },
  date_started: { type: Date, default: null },
  date_finished: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", BookSchema);
