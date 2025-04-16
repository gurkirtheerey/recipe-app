export type Collection = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  created_at: string;
  updated_at: string;
  collection_recipes: CollectionRecipe[];
};

export type CollectionRecipe = {
  collection_id: string;
  recipe_id: string;
};
