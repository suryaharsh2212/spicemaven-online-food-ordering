

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log("Logout request received for user ID:", userId);

    res.status(200).json({
      message: 'User logged out successfully',
      error: false
    });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error', error: true });
  }
};
