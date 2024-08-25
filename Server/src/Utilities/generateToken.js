import jwt from 'jsonwebtoken';

export const generateToken = (user) => {

  return jwt.sign({ id: user._id, email: user.email }, 'urtgr54g664yt6yhfhtt4', {
    expiresIn: '1d' 
  });
};