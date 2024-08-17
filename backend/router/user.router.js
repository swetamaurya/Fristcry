const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const { BlacklistModel } = require("../model/blacklist.model");

const userRouter = express.Router();

//register

userRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 8, async (err, hash) => {
      const user = new UserModel({ name, email, password: hash });
      await user.save();
      res.send({msg : "Registered succsesfully"});
    });
  } catch (err) {
    res.send("Error in registering the user");
    console.log(err);
  }
});

//login
userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          var token = jwt.sign({ name: "tarun" }, "masai");
          res.send({ msg: "login succesfully", token: token });
        } else {
          res.send(err);
          console.log(err);
        }
      });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});


//logout

userRouter.post("/logout" , async (req,res)=>{
    let token = req.headers.authorization
    console.log(token)

    let blacklisted = new BlacklistModel({token})
    await blacklisted.save()
    res.send({msg : "Logout Successfully"})
})

module.exports = {
  userRouter,
};
