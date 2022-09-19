const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    image1: String,
    image2: String,
    image3: String,
    location: String,
    rate: Number,
    bio: String,
    password: String,

    rating: Number,
    isFeatured: Boolean,
    isVerified: Boolean,
    paidSignUp: Boolean
})

exports.User = mongoose.model("User", UserSchema)