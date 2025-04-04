export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients?: string[];
  instructions?: string[];
  prep_time?: number;
  cook_time?: number;
  total_time?: number;
  servings?: number;
  rating?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface Collection {
  id: string;
  title: string;
  recipeCount: number;
  image: string;
}

export interface RecipeCardProps {
  item: Recipe | Collection;
  type: 'recipe' | 'collection';
  className?: string;
}

export interface RecipeRowProps {
  title: string;
  items: Recipe[] | Collection[] | undefined;
  type: 'recipe' | 'collection';
}
