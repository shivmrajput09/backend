import generateToken from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// ==================== SIGNUP ====================
export const signUp = async (req, res) => {
  try {
    // Step 1: Get data from request body
    const { firstName, lastName, email, password, userName } = req.body;

    // Step 2: Validate required fields
    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({
        message: "Send all details",
      });
    }

    // Step 3: Check existing user
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Step 4: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
    });

    // Step 6: Generate token using NEW user's ID
    const token = generateToken(user._id);

    // Step 7: Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Step 8: Send response
    return res.status(201).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    // Step 1: Get email and password
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Step 2: Find user by email
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }

    // Step 3: Compare entered password with hashed password
    const match = await bcrypt.compare(password, existUser.password);

    if (!match) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    // Step 4: Generate token using existing user's ID
    const token = generateToken(existUser._id);

    // Step 5: Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Step 6: Send response
    return res.status(200).json({
      user: {
        _id: existUser._id,
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
        userName: existUser.userName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};




//logout

export  const  logout =  async(req,res)=>{
    try {
        res.clearCookie("token")
      return  res.status(200).json({message:"logout successfully"})
    } catch (error) {
            return res.status(500).json(error)

    }
}