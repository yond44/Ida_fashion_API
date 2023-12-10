const { default: mongoose } = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter a Username"],
      unique: [true, "This Username has been used"],
    },
    password: {
      type: String,
      required: [true, "Please Enter a Username"],
    },
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter an Email"],
      unique: [true, "This Email has been used"],
    },
    phone_number: {
      type: Number,
      required: [true, "Please Enter a Phone Number"],
    }
  },
  {
    timestamp: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
