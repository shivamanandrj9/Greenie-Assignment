import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const userSignupControl = async (req, res) => {
  const { userName, userPassword, userEmail, phone } = req.body;

  try {
    const userExists = await userModel.findOne({ userName });
    console.log(userExists);
    if (userExists) {
      console.log("User already exists!");
      return res.json({
        message: `User with username ${userName} already exists!`,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new userModel({
      userName,
      userPassword: hashedPassword,
      userEmail,
      phone: phone || ''
    });

    await newUser.save();

    console.log("User Registered Successfully!!");
    return res.json({
      message: "User Registered Successfully!!",
      success: true,
      isAdmin: newUser.isAdmin
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      message: "Some error occurred. Please try again!",
      success: false,
    });
  }
};

const userLoginControl = async (req, res) => {
  const { userName, userPassword } = req.body;

  try {
    const user = await userModel.findOne({ userName });

    if (!user) {
      console.log(`User doesn't exist!`);
      return res.json({
        message: `User with username ${userName} does not exist!`,
        success: false,
      });
    }

    const passwordValid = await bcrypt.compare(
      userPassword,
      user?.userPassword || ''
    );

    if (!passwordValid) {
      console.log("Password doesn't match!");
      return res.json({
        message: "Invalid credentials. Please check your username and password!",
        success: false,
      });
    }

    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);

    console.log("User Logged In Successfully!!");
    return res.json({
      token,
      userID: user?._id,
      isAdmin:user?.isAdmin,
      message: "User Logged In Successfully!!",
      success: true,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      message: "Some error occurred. Please try again!",
      success: false,
    });
  }
};

const userUpdateDetails = async (req, res) => {
  const {  phone } = req.body;
  const token = req.body?.token;
  const userID = jwt.decode(token, process.env.JWT_SECRET);

  try {
    if (!userID || !userID.id) {
      console.log(`Invalid user ID!`);
      return res.json({
        message: "Invalid user ID!",
        success: false,
      });
    }

    const user = await userModel.findById(userID.id);

    if (!user) {
      console.log(`User doesn't exist!`);
      return res.json({
        message: `User with ID ${userID.id} does not exist!`,
        success: false,
      });
    }

    // if (userEmail) user.userEmail = userEmail;
    if (phone) user.phone = phone;

    await user.save();

    console.log("Details Updated Successfully");
    return res.json({
      message: "Details Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      message: "Some error occurred. Please try again!",
      success: false,
    });
  }
};

export { userSignupControl, userLoginControl, userUpdateDetails };
