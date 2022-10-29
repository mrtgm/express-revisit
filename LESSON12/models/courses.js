const { mongoose } = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [],
});

module.exports = mongoose.model("Course", courseSchema);
