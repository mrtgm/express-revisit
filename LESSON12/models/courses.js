const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const courseSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    maxStudents: {
      type: Number,
      default: 0,
      min: [0, "Can't be a negative number"],
    },
    const: {
      type: Number,
      default: 0,
      min: [0, "Can't be a negative number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
