const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.post("/register", async (req, res) => {
  const saltRounds = 10;
  const someOtherPlaintextPassword = "room_user";

  const hashPassword = (plainPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  };

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: await hashPassword(req.body.password),
  };

  try {
    let alreadyExist = await userModel.findOne({ email: user.email });
    if (alreadyExist == null) {
      const newuser = new userModel(user);
      console.log(user);
      let data = await newuser.save();
      console.log(data);
      return res.status(201).json({ message: "user created successfully" });
    } else {
      return res.status(409).json({ message: "user already exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(user);

  try {
    let data = await userModel.findOne({ email: user.email });

    if (data == null) {
      return res.status(404).send({ message: "user not found" });
    } else {
      const validUser = await bcrypt.compare(user.password, data.password);

      if (validUser) {
        const { email, _id, isAdmin, name } = data;

        const token = await jwt.sign({ id: _id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.status(200).json({
          email: email,
          id: _id,
          isAdmin: isAdmin,
          name: name,
          token: token,
        });
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    }
  } catch (err) {}
});

module.exports = router;
