const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
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
      default: '/uploads/placeholder-profile.jpeg',
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      enum: ['Female', 'Male', 'Non-binary'],
    },
    occupation: {
      type: String,
      enum: ['Study', 'Work', 'Both'],
    },
    personality: {
      type: String,
      enum: ['Introvert', 'Extrovert', 'Ambivert'],
      default: 'Ambivert',
    },
    lifestyle: {
      type: String,
      enum: ['Active', 'Relaxed', 'Balanced'],
      default: 'Balanced',
    },
    introduceYourself: {
      type: String,
      default: '',
    },
    music: {
      type: [String],
      default: [], // An array of strings representing music genres
    },
    sports: {
      type: [String],
      default: [], // An array of strings representing sports interests
    },
    movieGenres: {
      type: [String],
      default: [], // An array of strings representing preferred movie genres
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
