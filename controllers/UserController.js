const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

//user login implementation
const login = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });

    const user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ message: "No account with this email has been registered.", success: false });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials.", success: false });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.json({
      token,
      response: user,
      message: "User logged in successfully...",
      success: true,
    });

  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
}

//registeing new users
const register = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;
    // validate
    console.log('name-email-passowrd ;', req.body)
    if (!email || !password || !name || !mobile)
      return res.status(400).json({ message: "Not all fields have been entered.", success: false });

    if (password.length < 5)
      return res
        .status(400)
        .json({ message: "The password needs to be at least 5 characters long.", success: false });


    const existingUser = await userModel.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "An account with this email already exists.", success: false });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      email,
      password: passwordHash,
      name,
      mobile
    });
    const savedUser = await newUser.save();
    res.json({ message: 'user created successfully', user: savedUser, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};


module.exports = {
  register,
  login
};
