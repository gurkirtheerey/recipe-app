import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Create a new recipe
 * @param req - The request object
 * @returns A JSON object containing the recipe data
 */
export async function POST(req: Request) {
  const { title, description, ingredients, instructions, prep_time, cook_time, servings, image } = await req.json();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase.from('recipes').insert({
    title,
    description,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    servings,
    image,
    user_id: user.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Recipe created successfully' }, { status: 200 });
}
