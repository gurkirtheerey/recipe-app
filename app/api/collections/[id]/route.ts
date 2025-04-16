import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Get a collection by id
 * @param request - The request object
 * @param params - The params object
 * @returns The collection
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .single();

  if (collectionError) {
    return NextResponse.json({ error: collectionError.message }, { status: 500 });
  }

  const { data: recipeData, error: recipesError } = await supabase
    .from('collection_recipes')
    .select('recipe:recipes(*)')
    .eq('collection_id', id);

  if (recipesError) {
    return NextResponse.json({ error: recipesError.message }, { status: 500 });
  }

  const recipes = recipeData.map((recipe) => recipe.recipe);

  const { data: myRecipes, error: myRecipesError } = await supabase.from('recipes').select('*').eq('user_id', user.id);

  if (myRecipesError) {
    return NextResponse.json({ error: myRecipesError.message }, { status: 500 });
  }

  return NextResponse.json({ collection, recipes, myRecipes });
}

/**
 * Add a recipe to a collection
 * @param request - The request object
 * @param params - The params object
 * @returns The collection
 */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  await supabase.from('collection_recipes').delete().eq('collection_id', id);

  const { data, error } = await supabase.from('collection_recipes').insert(body);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const body = await request.json();
  const { recipeId } = body;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('collection_recipes')
    .delete()
    .eq('collection_id', id)
    .eq('recipe_id', recipeId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

/**
 * Update a collection
 * @param request - The request object
 * @param params - The params object
 * @returns The collection
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error: collectionError } = await supabase.from('collections').update(body).eq('id', id);

  if (collectionError) {
    return NextResponse.json({ error: collectionError.message }, { status: 500 });
  }

  // Step 2: Fetch all collections sorted by `created_at` DESC
  const { data: collections, error: collectionsError } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (collectionsError) {
    return NextResponse.json({ error: collectionsError.message }, { status: 500 });
  }

  return NextResponse.json({ collections }, { status: 200 });
}
