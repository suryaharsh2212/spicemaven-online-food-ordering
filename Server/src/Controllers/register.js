
import bcrypt from "bcrypt"
import { spiceUser } from "../Database/Model/UserModel.js";



export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNo,password } = req.body;
   
    
    

    if (!name || !email || !phoneNo || !password ) {
      return res.status(400).json({ message: 'All fields are required',error:true });
    }

    const existingUseremail = await spiceUser.findOne({ email });
    if (existingUseremail) {
      return res.status(409).json({ message: 'spiceUser with email already exists', error:true, flag:"email" });
    }
    const existingUserPhone = await spiceUser.findOne({ phoneNo });
    if (existingUserPhone) {
      return res.status(409).json({ message: 'spiceUser with Phone no already exists',error:true,flag:"phone" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    

    const newUser = new spiceUser({
      name,
      email,
      phoneNo,
      password:hashedPassword
    });


    await newUser.save();

    res.status(201).json({
      message: 'spiceUser registered successfully',
      error:false,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNo: newUser.phoneNo,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error',error:true });
  }
};
