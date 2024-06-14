const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    },
    profileImageUrl: {
      type: String,
      default: 'https://via.placeholder.com/150', // Default placeholder image
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    location: {
      type: String,
    },
    socialTraits: {
      type: String,
      enum: ['Extrovert', 'Introvert', 'Ambivert'],
    },
    foodPreferences: {
      type: String,
      enum: ['Veg', 'Non-Veg', 'Vegan'],
    },
    hobbies: {
      type: [String],
    },
    // reviews: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Review',
    //   },
    // ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
