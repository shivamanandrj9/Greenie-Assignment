import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const userListControl = async (req, res) => {
  const token = req.body?.token;
  const userID = jwt.decode(token, process.env.JWT_SECRET);
  const user = await userModel.findById(userID?.id);
  console.log(user);
  if (!user?.isAdmin) {
    console.log("Unautorized Access!");
    return res.json({ message: "Access Denied", success: false });
  }

  try {
    const data = await userModel
      .find(
        { isAdmin: false },
        {
          userName: 1,
          userEmail: 1,
          phone: 1,
        }
      )
      .sort({ userName: 1 });
    console.log("List Fetched Successfully");
    return res.json({ list: data, success: true });
  } catch (error) {
    console.log("Error Catching List", error?.message);
    return res.json({
      error,
      message: "Error Catching List. Please try again",
      success: false,
    });
  }
};

const adminSignupControl = async (req, res) => {
  const { userName, userPassword, userEmail, phone } = req.body;

  try {
    const userExists = await userModel.findOne({ userName });
    console.log(userExists);
    if (userExists) {
      console.log("User already exists!");
      return res.json({
        message: 'User with username ${userName} already exists!',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new userModel({
      userName,
      userPassword: hashedPassword,
      userEmail,
      phone: phone || '',
      isAdmin: true
    });

    await newUser.save();

    console.log("User Registered Successfully!!");
    return res.json({
      message: "User Registered Successfully!!",
      success: true,
      isAdmin: true
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      message: "Some error occurred. Please try again!",
      success: false,
    });
  }
};


export { userListControl, adminSignupControl };