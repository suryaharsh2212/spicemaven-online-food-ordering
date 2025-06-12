
import bcrypt from "bcrypt"
import { spiceUser } from "../Database/Model/UserModel.js";
import { generateToken } from "../Utilities/generateToken.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNo, password } = req.body;
    if (!name || !email || !phoneNo || !password) {
      return res.status(400).json({ message: 'All fields are required', error: true });
    }
    const existingUseremail = await spiceUser.findOne({ email });
    if (existingUseremail) {
      return res.status(409).json({ message: 'spiceUser with email already exists', error: true, flag: "email" });
    }
    const existingUserPhone = await spiceUser.findOne({ phoneNo });
    if (existingUserPhone) {
      return res.status(409).json({ message: 'spiceUser with Phone no already exists', error: true, flag: "phone" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new spiceUser({
      name,
      email,
      phoneNo,
      password: hashedPassword
    });
    await user.save();
    
    const token = generateToken(user);
    user.token = token;
    

    res.status(201).json({
      message: 'spiceUser registered successfully',
      error: false,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error', error: true });
  }
};
