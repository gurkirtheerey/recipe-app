import { v4 as uuidv4 } from "uuid";

const favoriteRecipes = [
  {
    id: uuidv4(),
    title: "Spaghetti Carbonara",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop",
    description:
      "A classic Italian pasta dish with eggs, cheese, and crispy guanciale",
  },
  {
    id: uuidv4(),
    title: "Chicken Stir Fry",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&auto=format&fit=crop",
    description:
      "Quick and healthy Asian-inspired dish with tender chicken and fresh vegetables",
  },
  {
    id: uuidv4(),
    title: "Classic Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1000&auto=format&fit=crop",
    description:
      "Traditional Italian pizza with fresh mozzarella, tomatoes, and basil",
  },
  {
    id: uuidv4(),
    title: "Vegetable Curry",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
    description:
      "Rich and creamy curry packed with colorful vegetables and aromatic spices",
  },
];
