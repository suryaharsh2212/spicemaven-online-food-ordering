import { Dish } from "./DishModel.js";

const starters = [
    {
      name: "Paneer Tikka",
      price: 250,
      description: "Marinated paneer cubes grilled to perfection.",
      rating: 4.5,
      vegetarian: true,
      image: "https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=600",
      section: "Starters"
    },
    {
      name: "Chicken Tandoori",
      price: 320,
      description: "Juicy chicken marinated in yogurt and spices, cooked in a tandoor.",
      rating: 4.8,
      vegetarian: false,
      image: "https://img.freepik.com/free-photo/close-up-delicious-chicken-meal_23-2150741761.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Veg Samosa",
      price: 80,
      description: "Crispy pastry filled with spiced potatoes and peas.",
      rating: 4.4,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/deep-fried-samosas-dumplings-gourmet-appetizer-generated-by-ai_188544-13491.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Fish Amritsari",
      price: 300,
      description: "Spicy, batter-fried fish fillets.",
      rating: 4.6,
      vegetarian: false,
      image: "https://img.freepik.com/free-photo/top-view-delicious-fish-meal-tray_23-2148734692.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Hara Bhara Kabab",
      price: 200,
      description: "Pan-fried kababs made with spinach and green peas.",
      rating: 4.3,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/plate-lamb-kebabs-with-vegetables-bowl-red-sauce_188544-43095.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Panner Manchurian",
      price: 140,
      description: "Panner chilly made with pure panner.",
      rating: 4.8,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/meatballs-sweet-sour-tomato-sauce_2829-19545.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Aloo Tikki",
      price: 120,
      description: "Crispy potato patties served with tamarind chutney.",
      rating: 4.2,
      vegetarian: true,
      image: "https://img.freepik.com/premium-photo/photography-tasty-aloo-tikki_1288657-57017.jpg?size=626&ext=jpg&uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Papdi Chaat",
      price: 100,
      description: "Crispy wafers topped with spiced yogurt, chutney, and sev.",
      rating: 4.5,
      vegetarian: true,
      image: "https://img.freepik.com/premium-photo/golden-crispy-fried-papdi-chaat-white-background-papdi-chat-picture_1020697-138066.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Chicken Malai Tikka",
      price: 320,
      description: "Creamy, tender chicken marinated in cheese and cream.",
      rating: 4.7,
      vegetarian: false,
      image: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-apples-chili_2829-19992.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Dahi Ke Kebab",
      price: 220,
      description: "Crispy, soft kebabs made with yogurt and paneer.",
      rating: 4.6,
      vegetarian: true,
      image: "https://img.freepik.com/premium-photo/pan-food-with-chicken-vegetables-it_985633-22232.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    },
    {
      name: "Shammi Kebab",
      price: 340,
      description: "Minced mutton patties blended with chana dal and spices.",
      rating: 4.6,
      vegetarian: false,
      image: "https://img.freepik.com/free-photo/bbq-grill-cooked-with-hot-spicy-sichuan-pepper-sauce-is-chinese-herb_1150-13495.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid",
      section: "Starters"
    }
  ];
  const vegGravy = [
    {
      name: "Paneer Butter Masala",
      price: 320,
      description: "Paneer cooked in a rich tomato-based gravy.",
      rating: 4.7,
      vegetarian: true,
      image: "https://images.pexels.com/photos/6427580/pexels-photo-6427580.jpeg?auto=compress&cs=tinysrgb&w=600",
      section: "Veg Gravy"
    },
    {
      name: "Aloo Gobi",
      price: 240,
      description: "Potatoes and cauliflower cooked with spices.",
      rating: 4.3,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/aloo-gobi-spiced-potato-cauliflower-dish-served-with-basmati-rice-chapati_466689-76951.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Matar Paneer",
      price: 300,
      description: "Paneer cubes and peas cooked in a spiced tomato gravy.",
      rating: 4.6,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/indian-cuisine-mutter-paneer-also-known-as-matar-paneer-with-peas-cottage-cheese-curry_466689-76861.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Baingan Bharta",
      price: 260,
      description: "Smoky mashed eggplant cooked with onions, tomatoes, and spices.",
      rating: 4.5,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/baingan-bharta-baked-spicy-mashed-eggplant-dish-originating-from-indian-subcontinent-served-bowl_466689-77007.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Chana Masala",
      price: 280,
      description: "Chickpeas cooked in a spicy and tangy gravy.",
      rating: 4.6,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/chickpea-indian-dish-served-white-bowl_123827-20121.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Malai Kofta",
      price: 340,
      description: "Deep-fried paneer and potato balls in a creamy gravy.",
      rating: 4.8,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/indian-mughlai-food-malai-kofta_466689-77020.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Dum Aloo",
      price: 280,
      description: "Baby potatoes cooked in a rich and spicy gravy.",
      rating: 4.5,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/dum-aloo-recipe-with-green-peas-garnish_466689-73938.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Methi Malai Matar",
      price: 300,
      description: "Fenugreek leaves and peas in a creamy gravy.",
      rating: 4.6,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/methi-matar-malai-popular-indian-dish-made-fenugreek-greens-green-peas-served-terracotta-crockery-bowl-selective-focus_466689-74155.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Kadai Paneer",
      price: 320,
      description: "Paneer cooked with bell peppers in a spicy tomato gravy.",
      rating: 4.7,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/kadai-paneer-paneer-tikka-served-bowl_466689-77054.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Palak Paneer",
      price: 300,
      description: "Paneer cubes cooked in a spiced spinach gravy.",
      rating: 4.7,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/indian-cuisine-palak-paneer_182835-1663.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Veg Jalfrezi",
      price: 280,
      description: "Mixed vegetables cooked in a tangy tomato sauce.",
      rating: 4.5,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/vegetable-jalfrezi-dish_123827-20127.jpg",
      section: "Veg Gravy"
    },
    {
      name: "Mix Veg Curry",
      price: 270,
      description: "A medley of vegetables cooked in a spiced gravy.",
      rating: 4.4,
      vegetarian: true,
      image: "https://img.freepik.com/free-photo/mix-veg-curry-served-bowl_182835-1658.jpg",
      section: "Veg Gravy"
    }
  ];
  
  const nonVegGravy = [
    {
      name: "Butter Chicken",
      price: 340,
      description: "Tender chicken cooked in a creamy tomato gravy.",
      rating: 4.9,
      vegetarian: false,
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Mutton Rogan Josh",
      price: 400,
      description: "Aromatic lamb curry from Kashmir.",
      rating: 4.8,
      vegetarian: false,
      image: "https://images.pexels.com/photos/6164048/pexels-photo-6164048.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Fish Curry",
      price: 320,
      description: "Fish fillets cooked in a tangy and spicy gravy.",
      rating: 4.6,
      vegetarian: false,
      image: "https://images.pexels.com/photos/6287767/pexels-photo-6287767.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Goan Fish Curry",
      price: 360,
      description: "Traditional Goan fish curry made with coconut and spices.",
      rating: 4.7,
      vegetarian: false,
      image: "https://images.pexels.com/photos/5982281/pexels-photo-5982281.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Chicken Chettinad",
      price: 340,
      description: "Spicy chicken curry with a rich, peppery flavor.",
      rating: 4.7,
      vegetarian: false,
      image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Prawn Malai Curry",
      price: 380,
      description: "Prawns cooked in a creamy coconut milk gravy.",
      rating: 4.8,
      vegetarian: false,
      image: "https://images.pexels.com/photos/4877859/pexels-photo-4877859.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Egg Curry",
      price: 280,
      description: "Boiled eggs cooked in a spiced onion-tomato gravy.",
      rating: 4.5,
      vegetarian: false,
      image: "https://images.pexels.com/photos/1263638/pexels-photo-1263638.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Mutton Keema",
      price: 360,
      description: "Minced mutton cooked with peas and spices.",
      rating: 4.6,
      vegetarian: false,
      image: "https://images.pexels.com/photos/4977209/pexels-photo-4977209.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Chicken Korma",
      price: 350,
      description: "Rich chicken curry with yogurt and cream.",
      rating: 4.7,
      vegetarian: false,
      image: "https://images.pexels.com/photos/5852682/pexels-photo-5852682.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Mutton Vindaloo",
      price: 370,
      description: "Spicy and tangy mutton curry from Goa.",
      rating: 4.6,
      vegetarian: false,
      image: "https://images.pexels.com/photos/4164079/pexels-photo-4164079.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Chicken Bhuna",
      price: 330,
      description: "Chicken pieces cooked in a thick, spicy gravy.",
      rating: 4.6,
      vegetarian: false,
      image: "https://images.pexels.com/photos/6430486/pexels-photo-6430486.jpeg",
      section: "Non-Veg Gravy"
    },
    {
      name: "Mutton Do Pyaza",
      price: 380,
      description: "Mutton cooked with double the amount of onions.",
      rating: 4.7,
      vegetarian: false,
      image: "https://images.pexels.com/photos/5020953/pexels-photo-5020953.jpeg",
      section: "Non-Veg Gravy"
    }
  ];
  
  const chinese = [
    {
      name: "Veg Manchurian",
      price: 240,
      description: "Fried vegetable balls in a tangy soy-based sauce.",
      rating: 4.5,
      vegetarian: true,
      image: "https://images.pexels.com/photos/1239338/pexels-photo-1239338.jpeg",
      section: "Chinese"
    },
    {
      name: "Chilli Chicken",
      price: 320,
      description: "Spicy chicken pieces stir-fried with onions and peppers.",
      rating: 4.6,
      vegetarian: false,
      image: "https://images.pexels.com/photos/12996616/pexels-photo-12996616.jpeg",
      section: "Chinese"
    },
    {
      name: "Hakka Noodles",
      price: 260,
      description: "Stir-fried noodles with vegetables.",
      rating: 4.4,
      vegetarian: true,
      image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg",
      section: "Chinese"
    },
    {
      name: "Szechuan Fried Rice",
      price: 280,
      description: "Spicy fried rice with vegetables or chicken.",
      rating: 4.6,
      vegetarian: true,
      image: "https://images.pexels.com/photos/11397163/pexels-photo-11397163.jpeg",
      section: "Chinese"
    },
    {
      name: "Spring Rolls",
      price: 220,
      description: "Crispy rolls filled with vegetables.",
      rating: 4.3,
      vegetarian: true,
      image: "https://images.pexels.com/photos/10920438/pexels-photo-10920438.jpeg",
      section: "Chinese"
    },
    {
      name: "Chicken Manchurian",
      price: 320,
      description: "Chicken balls in a spicy garlic-ginger sauce.",
      rating: 4.7,
      vegetarian: false,
      image: "https://images.pexels.com/photos/12793357/pexels-photo-12793357.jpeg",
      section: "Chinese"
    },
    {
      name: "Veg Fried Rice",
      price: 250,
      description: "Stir-fried rice with mixed vegetables.",
      rating: 4.5,
      vegetarian: true,
      image: "https://images.pexels.com/photos/4033402/pexels-photo-4033402.jpeg",
      section: "Chinese"
    },
    {
      name: "Chilli Paneer",
      price: 280,
      description: "Paneer stir-fried with bell peppers in a tangy sauce.",
      rating: 4.6,
      vegetarian: true,
      image: "https://images.pexels.com/photos/10023848/pexels-photo-10023848.jpeg",
      section: "Chinese"
    },
    {
      name: "Dragon Chicken",
      price: 340,
      description: "Chicken stir-fried with a spicy sweet and sour sauce.",
      rating: 4.7,
      vegetarian: false,
      image: "https://images.pexels.com/photos/5865427/pexels-photo-5865427.jpeg",
      section: "Chinese"
    },
    {
      name: "Veg Schezwan Noodles",
      price: 270,
      description: "Spicy noodles with vegetables.",
      rating: 4.6,
      vegetarian: true,
      image: "https://images.pexels.com/photos/2356976/pexels-photo-2356976.jpeg",
      section: "Chinese"
    },
    {
      name: "Honey Chilli Potato",
      price: 240,
      description: "Crispy potato fingers tossed in a sweet and spicy sauce.",
      rating: 4.4,
      vegetarian: true,
      image: "https://images.pexels.com/photos/1081970/pexels-photo-1081970.jpeg",
      section: "Chinese"
    },
    {
      name: "Prawn Fried Rice",
      price: 340,
      description: "Stir-fried rice with prawns and vegetables.",
      rating: 4.7,
      vegetarian: false,
      image: "https://images.pexels.com/photos/5838620/pexels-photo-5838620.jpeg",
      section: "Chinese"
    }
  ];
  
  const drinksBeverages = [
    {
      name: "Masala Chai",
      price: 50,
      description: "Traditional Indian spiced tea.",
      rating: 4.8,
      vegetarian: true,
      image: "https://www.pexels.com/photo/masala-chai.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Lassi",
      price: 80,
      description: "Refreshing yogurt drink, available in sweet or salty.",
      rating: 4.7,
      vegetarian: true,
      image: "https://www.pexels.com/photo/lassi.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Mango Shake",
      price: 100,
      description: "Creamy mango milkshake.",
      rating: 4.8,
      vegetarian: true,
      image: "https://www.pexels.com/photo/mango-shake.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Coconut Water",
      price: 60,
      description: "Natural, refreshing coconut water.",
      rating: 4.7,
      vegetarian: true,
      image: "https://www.pexels.com/photo/coconut-water.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Fresh Lime Soda",
      price: 70,
      description: "Refreshing soda with lime, available sweet or salty.",
      rating: 4.6,
      vegetarian: true,
      image: "https://www.pexels.com/photo/fresh-lime-soda.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Cold Coffee",
      price: 120,
      description: "Chilled coffee with a hint of chocolate.",
      rating: 4.8,
      vegetarian: true,
      image: "https://www.pexels.com/photo/cold-coffee.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Thandai",
      price: 100,
      description: "Spiced milk drink, popular during festivals.",
      rating: 4.7,
      vegetarian: true,
      image: "https://www.pexels.com/photo/thandai.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Buttermilk",
      price: 50,
      description: "Light, refreshing, and spiced yogurt drink.",
      rating: 4.5,
      vegetarian: true,
      image: "https://www.pexels.com/photo/buttermilk.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Watermelon Juice",
      price: 90,
      description: "Freshly squeezed watermelon juice.",
      rating: 4.6,
      vegetarian: true,
      image: "https://www.pexels.com/photo/watermelon-juice.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Lemon Iced Tea",
      price: 100,
      description: "Chilled tea with a refreshing lemon flavor.",
      rating: 4.6,
      vegetarian: true,
      image: "https://www.pexels.com/photo/lemon-iced-tea.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Badam Milk",
      price: 100,
      description: "Milk infused with almonds and cardamom.",
      rating: 4.8,
      vegetarian: true,
      image: "https://www.pexels.com/photo/badam-milk.jpg",
      section: "Drink & Beverages"
    },
    {
      name: "Frooti",
      price: 50,
      description: "Popular mango-flavored drink.",
      rating: 4.4,
      vegetarian: true,
      image: "https://www.pexels.com/photo/frooti.jpg",
      section: "Drink & Beverages"
    }
  ];
  



  import mongoose from "mongoose";

  async function ConnectToMongo()
  {
      try {
          const connection= await mongoose.connect('mongodb+srv://suryaraj04266:Surya2212@clusterbackend.n0p1ajr.mongodb.net')
          console.log(`Database connected sucessfully ..............`)
      } catch (error) {
          console.log("Some error occured during conntecting..............",error.message);
      }
  }
  export default ConnectToMongo;
 
  const inserter = async () => {
    ConnectToMongo()
    try {
      const dish = await Dish.insertMany(chinese);

      console.log(dish);
    } catch (error) {
      console.error('Error inserting dish:', error);
    }
  };
  inserter()
