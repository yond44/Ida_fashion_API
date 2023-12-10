const Users = require("../../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Token = require("../../model/Token");
const verifyEmail = require("../../middleware/verifyEmai");




const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await Users.find();
    if (users === 0) return res.json({ message: "No data inputed yet" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const register = asyncHandler(async (req, res) => {
  const { username, password, name, email, phone_number, address, photo } =
    req.body;
  if (
    (username == "" || password == "",
    name == "" || email == "" || phone_number == "" || address == "")
  )
    return res.json({ error: "Please fill all required informations" });
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const duplicateUsername = await Users.findOne({ username: username });
  const duplicateEmail = await Users.findOne({ email: email });
  if (duplicateUsername)
    return res.status(400).json({ error: "Username has been used" });
  if (duplicateEmail)
    return res.status(400).json({ error: "Email has been used" });
  try {
    const users = await Users.create({
      username: username,
      password: hash,
      name: name,
      email: email,
      phone_number: phone_number,
      address: address,
      photo: photo,
    });
    const token = await Token.create({
      userId: users._id,
      token: crypto.randomBytes(20).toString("hex"),
    });

    const link = `http://localhost:3002/api/users/verify/${token.token}`;
    await verifyEmail(email, link);
    res.status(200).send({
      message: "Check your Email",
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const activateAccount = asyncHandler(async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });
    console.log(token);
    await Users.updateOne({ _id: token.userId }, { $set: { verified: true } });
    await Token.findByIdAndDelete(token._id);
    res.send("Email Verified");
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });
    if (!user)
      return res
        .status(400)
        .json({ error: "Username and password doesn't exist" });
    const match = await bcrypt.compare(password, user.password);
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

module.exports = { getUsers, register, activateAccount, login };
