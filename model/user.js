const { default: mongoose } = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter a Username"],
      unique: [true, "This Username has been used"],
    },
    password: {
      type: String,
      required: [true, "Please Enter a Username"]
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
    },
    address: {
      type: String,
      required: [true, "Please Enter an Address"],
    },
    photo: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);


const Users = mongoose.model('Users', usersSchema)

module.exports = Users
