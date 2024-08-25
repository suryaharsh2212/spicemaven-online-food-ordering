import { Dish } from "../Database/Model/DishModel.js";

export const getItemsBysearch = async (req, res) => {
  try {
    const { name } = req.body; 
    console.log(name);

    const dishes = await Dish.find({
      name: { $regex: new RegExp(name, 'i') }
    });

    console.log(dishes);

    if (dishes.length >= 1) {
      res.status(200).json({
        message: 'Items retrieved successfully',
        error: false,
        data: dishes,
      });
    } else {
      res.status(200).json({
        message: 'Items not found',
        error: true,
        data: dishes,
      });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: true });
  }
};
