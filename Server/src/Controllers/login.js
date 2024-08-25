import bcrypt from "bcrypt"
import { spiceUser } from "../Database/Model/UserModel.js";
import { generateToken } from "../Utilities/generateToken.js";

export const loginUser = async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;
      
      
     
      
      if (!emailOrPhone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const user = await spiceUser.findOne({
        $or: [{ email: emailOrPhone }, { phoneNo: emailOrPhone }]
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials Email or phoneNo not valid', error: true });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password', error: true });
      }
  
      const token = generateToken(user);
  
      user.token = token;
      await user.save();
  

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' 
      });
  

      res.status(200).json({
        message: 'spiceUser logged in successfully',
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
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error', error: true });
    }
  };