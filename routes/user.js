const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;

  if (!firstName) {
    res.json({
      status: "Failed",
      message: "First name is required",
    });
  } else if (!lastName) {
    res.json({
      status: "Failed",
      message: "Last name is required",
    });
  } else if (!phoneNumber) {
    res.json({
      status: "Failed",
      message: "Phone number is required",
    });
  } else if (!password) {
    res.json({
      status: "Failed",
      message: "Password is require",
    });
  } else {
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
            image1: "",
            image2: "",
            image3: "",
            location: "",
            rate: 0,
            bio: "",

            rating: 0,
            isFeatured: false,
            isVerified: false,
            paidSignUp: false,
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
        res.json({
          status: "Failed",
          message: "Error occured while getting user data",
        });
      });
  }
});

router.post("/registration", async (req, res) => {
  const { phoneNumber, image1, image2, image3, location, rate, bio } = req.body;
  if (!image1) {
    res.json({
      status: "Failed",
      message: "3 photos are required",
    });
  } else if (!image2) {
    res.json({
      status: "Failed",
      message: "3 photos are required",
    });
  } else if (!image3) {
    res.json({
      status: "Failed",
      message: "3 photos are required",
    });
  } else if (!location) {
    res.json({
      status: "Failed",
      message: "Location is required",
    });
  } else if (!rate) {
    res.json({
      status: "Failed",
      message: "Amount you charge is required",
    });
  } else if (!bio) {
    res.json({
      status: "Failed",
      message: "Bio is required",
    });
  } else if (!phoneNumber) {
    res.json({
      status: "Failed",
      message: "Phone number is required",
    });
  } else {
    await User.findOne({ phoneNumber }).then(async (response) => {
      if (response) {
        //user found
        await User.updateOne({
          phoneNumber,
          image1,
          image2,
          image3,
          location,
          rate,
          bio,
        })

          .then(() => {
            res.json({
              status: "Success",
              message: "User updated successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: "Failed",
              message: "Error occured while updating user",
            });
          });
      } else {
        //user not found
        res.json({
          status: "Failed",
          message: "User not found",
        });
      }
    });
  }
});

module.exports = router;
