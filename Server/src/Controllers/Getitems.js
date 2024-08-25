import { Dish } from "../Database/Model/DishModel.js";

export const getItems = async (req, res) => {
  try {
    const type = req.body;
     

    const dishes = await Dish.find({section:type.type});

 

    res.status(200).json({
      message: 'Items retrieved successfully',
      error: false,
      data: dishes,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: true });
  }
};


