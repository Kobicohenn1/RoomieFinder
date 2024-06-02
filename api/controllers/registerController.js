const User = require('../model/User');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request data
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ msg: 'Please provide username, email, and password' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      username,
      email,
      password,
    });

    // Encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;

    // Save the user to the database
    await user.save();

    // Return success response
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = handleNewUser;
