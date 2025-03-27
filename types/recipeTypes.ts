export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
}
