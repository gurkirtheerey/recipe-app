import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Update a recipe
 * @param request - The request object
 * @param params - The parameters object
 * @returns The updated recipe
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;
  const body = await request.json();
  const { data, error } = await supabase.from('recipes').update(body).eq('id', id).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
