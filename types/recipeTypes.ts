import { Profile } from './profileTypes';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time?: number;
  cook_time?: number;
  total_time?: number;
  servings: number;
  rating?: number;
  created_at: string;
  updated_at: string;
  user_id?: string;
  user?: Profile;
}

export interface RecipeCardProps {
  item: Recipe;
  type: 'recipe';
  className?: string;
}

export interface RecipeRowProps {
  title: string;
  items: Recipe[] | undefined;
  type: 'recipe';
  isLoading?: boolean;
}

export type RecipeWithFavorites = Recipe & {
  favorites?: {
    is_favorite: boolean;
  }[];
};
