export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  profile_picture?: string;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  total_time?: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  rating?: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  profile?: Profile;
}

export interface RecipeWithProfile extends Recipe {
  profile: Profile;
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
  isLoading?: boolean;
}
