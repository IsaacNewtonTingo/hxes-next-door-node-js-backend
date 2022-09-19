const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;
  await User.findOne({ phoneNumber })
    .then(async (response) => {
      if (response) {
        //User exists
        res.json({
          status: "Failed",
          message: "User with the given phone number exists",
        });
      } else {
        //User doesnt exist
        const newUser = new User({
          firstName,
          lastName,
          phoneNumber,
          password,
        });

        await newUser
          .save()
          .then(() => {
            res.json({
              status: "Success",
              message: "Account created successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: "Failed",
              message: "Error occured while saving user data",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      req.json({
        status: "Failed",
        message: "Error occured while getting user data",
      });
    });
});

module.exports = router;
