import { User } from "../modals/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "Please Enter All Fields",
      });

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists, Login Now",
      });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ email, password: hassedPassword, name });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      token,
      user,
      message: "User Register Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Network Error",
    });
  }
};

export const userlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Please Enter All Fields",
      });

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found, Register Now",
      });
    }

    const encodedPassword = await bcrypt.compare(password, user.password);

    if (!encodedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentails",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User Login Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Network Error",
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Network Error",
    });
  }
};
