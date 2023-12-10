const {
  activateAccount,
  getUsers,
  register,
  login
} = require("../services/users/user");

const express = require('express')


const userRouter = express()


userRouter.get('/users', getUsers)
userRouter.post("/users", register);
userRouter.get("/users/verify/:token", activateAccount);
userRouter.get("/users/login", login);


module.exports = userRouter



