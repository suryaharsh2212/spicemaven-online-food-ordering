import jwt from 'jsonwebtoken';
import { spiceUser } from '../Database/Model/UserModel.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided', error: true });
    }

    const secretKey = process.env.JWT_SECRET || 'urtgr54g664yt6yhfhtt4';
    const decoded = jwt.verify(token, secretKey);

    const user = await spiceUser.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found', error: true });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired', error: true });
    }
    console.error('Error authenticating user:', error.message);
    res.status(401).json({ message: 'Unauthorized', error: true });
  }
};
