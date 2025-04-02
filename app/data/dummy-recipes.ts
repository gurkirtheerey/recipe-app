import { v4 as uuidv4 } from "uuid";

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface Collection {
  id: string;
  title: string;
  recipeCount: number;
  coverImage: string;
}

export const recentRecipes: Recipe[] = [
  {
    id: uuidv4(),
    title: "Spaghetti Carbonara",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=800",
    description:
      "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
  },
  {
    id: uuidv4(),
    title: "Grilled Salmon",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=800",
    description:
      "Fresh salmon fillet with lemon and herbs, grilled to perfection.",
  },
  {
    id: uuidv4(),
    title: "Avocado Toast",
    image:
      "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=800",
    description:
      "Smashed avocado on sourdough with poached eggs and chili flakes.",
  },
  {
    id: uuidv4(),
    title: "Berry Smoothie Bowl",
    image:
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
    description:
      "Mixed berries smoothie topped with granola, coconut, and fresh fruits.",
  },
  {
    id: uuidv4(),
    title: "Cheeseburger",
    image:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800",
    description:
      "Juicy beef patty with melted cheese, lettuce, tomato, and a soft bun.",
  },
];

export const favoriteRecipes: Recipe[] = [
  {
    id: uuidv4(),
    title: "Chicken Tikka Masala",
    image:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800",
    description: "Creamy and aromatic Indian curry with tender chicken pieces.",
  },
  {
    id: uuidv4(),
    title: "Homemade Pizza",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800",
    description: "Stone-baked pizza with fresh mozzarella and basil.",
  },
  {
    id: uuidv4(),
    title: "Vietnamese Pho",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800",
    description: "Traditional beef noodle soup with herbs and spices.",
  },
  {
    id: uuidv4(),
    title: "Greek Salad",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800",
    description: "Fresh Mediterranean salad with feta cheese and olives.",
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
    title: "Vegetable Curry",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
    description:
      "Spicy vegetable curry with a blend of aromatic spices and fresh vegetables",
  },
];

export const collections: Collection[] = [
  {
    id: uuidv4(),
    title: "Italian Classics",
    recipeCount: 12,
    coverImage:
      "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=800",
  },
  {
    id: uuidv4(),
    title: "Asian Fusion",
    recipeCount: 8,
    coverImage:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=800",
  },
  {
    id: uuidv4(),
    title: "Healthy Breakfast",
    recipeCount: 15,
    coverImage:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800",
  },
  {
    id: uuidv4(),
    title: "Quick & Easy",
    recipeCount: 20,
    coverImage:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800",
  },

  {
    id: uuidv4(),
    title: "Asian Delights",
    recipeCount: 20,
    coverImage:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=800",
  },
  {
    id: uuidv4(),
    title: "American Comforts",
    recipeCount: 10,
    coverImage:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800",
  },
];
