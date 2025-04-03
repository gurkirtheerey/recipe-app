import { recentRecipes } from "./dummy-recipes";
import { favoriteRecipes } from "./dummy-recipes";
// import { collections } from "./dummy-recipes";

const rows = [
  {
    title: "Recent Recipes",
    items: recentRecipes,
    type: "recipe" as const,
  },
  {
    title: "Favorite Recipes",
    items: favoriteRecipes,
    type: "recipe" as const,
  },
  // TODO: Add recipe collections
  //   {
  //     title: "Recipe Collections",
  //     items: collections,
  //     type: "collection" as const,
  //   },
];

export default rows;
