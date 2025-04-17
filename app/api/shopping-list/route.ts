import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Get the shopping list for the current user
 * @returns A JSON object containing the ingredient data
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase.from('ingredients').select('*').eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ingredients: data });
}

/**
 * Add an ingredient to the shopping list
 * @param req - The request object
 * @returns A JSON object containing the ingredient data
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json();

  const { data, error } = await supabase.from('ingredients').insert({ name: name, user_id: user.id }).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ingredients: data });
}

/**
 * Delete an ingredient from the shopping list
 * @param req - The request object
 * @returns A JSON object containing the message
 */
export async function DELETE(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { ids } = await req.json();

  const { error } = await supabase.from('ingredients').delete().in('id', ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Item deleted' });
}
