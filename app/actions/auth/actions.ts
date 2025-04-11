'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function login(_: unknown, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  redirect('/');
}

export async function signup(_: unknown, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const data = {
    email: formData.get('email') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/check-email');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function updateUserMetadata(metadata: { first_name?: string; last_name?: string; username?: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    data: metadata,
  });

  if (error) {
    return { error: error.message };
  }

  // Revalidate all paths that show user data
  revalidatePath('/', 'layout'); // Revalidate the root layout which includes the sidebar

  return { success: true };
}
