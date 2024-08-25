
import Sectionupper from './Sectionupper'

const dummyData = [
  {
    link: "https://images.pexels.com/photos/6287536/pexels-photo-6287536.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A delicious traditional Italian pasta with rich tomato sauce and fresh basil.",
    name: "Italian Pasta",
    content: "Explore the rich flavors of Italy with this authentic pasta dish."
  },
  {
    link: "https://images.pexels.com/photos/1028427/pexels-photo-1028427.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Fresh sushi rolls made with premium seafood and perfectly seasoned rice.",
    name: "Sushi Platter",
    content: "Experience the taste of Japan with our exquisite sushi platter."
  },
  {
    link: "https://images.pexels.com/photos/25390071/pexels-photo-25390071/free-photo-of-grilled-chicken-served-with-broccoli.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Juicy grilled steak cooked to perfection with a side of seasoned vegetables.",
    name: "Grilled Steak",
    content: "Savor the flavors of a perfectly grilled steak."
  },
  {
    link: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A refreshing bowl of mixed fruits, perfect for a healthy snack.",
    name: "Fruit Salad",
    content: "Enjoy a refreshing and healthy fruit salad."
  },
  {
    link: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Crispy fried chicken served with a side of golden fries.",
    name: "Fried Chicken",
    content: "Indulge in our crispy and delicious fried chicken."
  },
  {
    link: "https://images.pexels.com/photos/7353487/pexels-photo-7353487.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Traditional Indian curry with tender chicken pieces and aromatic spices.",
    name: "Chicken Curry",
    content: "Delight in the rich and aromatic flavors of our chicken curry."
  },
  {
    link: "https://images.pexels.com/photos/25225619/pexels-photo-25225619/free-photo-of-pizza-with-olives.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Classic Margherita pizza topped with fresh mozzarella and basil.",
    name: "Margherita Pizza",
    content: "Taste the simplicity and freshness of our Margherita pizza."
  },
  {
    link: "https://images.pexels.com/photos/25409663/pexels-photo-25409663/free-photo-of-sweet-brownie-cake-on-plate.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A creamy and rich chocolate cake, perfect for dessert lovers.",
    name: "Chocolate Cake",
    content: "Indulge in a slice of our decadent chocolate cake."
  },
  {
    link: "https://images.pexels.com/photos/1320997/pexels-photo-1320997.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A refreshing and tangy lemonade, perfect for a hot summer day.",
    name: "Lemonade",
    content: "Quench your thirst with our refreshing lemonade."
  },
  
];

function Grid() {
  return (
    <div className="p-5 md:p-44">
      <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 mt-10">
        {dummyData.map((element, index) => (
          <Sectionupper
            key={index}
            name={element.name}
            description={element.description}
            link={element.link}
            content={element.content}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
