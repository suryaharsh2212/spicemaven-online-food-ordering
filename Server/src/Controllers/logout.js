

export const logoutUser = async (req, res) => {
  try {
    // const user = req.user;
    // user.token = null;
    // await user.save();

    // res.cookie('token', '', { httpOnly: false, expires: new Date(0) });

    res.status(200).json({
      message: 'User logged out successfully',
      error: false
    });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error', error: true });
  }
};
