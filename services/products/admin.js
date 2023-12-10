const Admin = require("../../model/admin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");



const getAdmin = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.find();
    if (admin === 0) return res.json({ message: "No data inputed yet" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const register = asyncHandler(async (req, res) => {
  const { username, password, name, email} =
    req.body;
  if (
    (username == "" || password == "",
    name == "" || email == "" || phone_number == "")
  ) return res.json({ error: "Please fill all required informations" });
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const duplicateUsername = await Admin.findOne({ username: username });
  const duplicateEmail = await Admin.findOne({ email: email });
  if (duplicateUsername)
    return res.status(400).json({ error: "Username has been used" });
  if (duplicateEmail)
    return res.status(400).json({ error: "Email has been used" });
  try {
    const admin = await Admin.create({
      username: username,
      password: hash,
      name: name,
      email: email,
      phone_number: phone_number
    });
    res.status(200).json(admin)
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});



const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (!admin)
      return res
        .status(400)
        .json({ error: "Username and password doesn't exist" });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ error: "Wrong Password" });
    } else {
      res.send("Login success");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const deleteAdmin = asyncHandler(async(req,res) => {
    try {
        const {username, password} = req.body;
        const admin = await Admin.findOne({
            username:username
        })
    } catch (error) {
        
    }
})

module.exports = { getUsers, register, activateAccount, login };
