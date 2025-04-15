import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { profileSchema } from '@/lib/schemas/profile';
import { z } from 'zod';
import { getMyRecipes } from '@/app/recipes/actions';
import { RecipeGrid } from '@/components/Recipe/RecipeGrid';

type Profile = z.infer<typeof profileSchema>;

const getUserByUsername = async (username: string): Promise<Profile | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const ProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username: usernameParam } = await params;
  const user = await getUserByUsername(usernameParam);
  if (!user) {
    notFound();
  }

  const { id, first_name, last_name, username, profile_picture } = user;

  const recipes = await getMyRecipes(id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <img
            src={profile_picture || `https://ui-avatars.com/api/?name=${first_name}+${last_name}`}
            alt={username}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold">{username}</h1>
          <p className="text-muted-foreground">
            {first_name} {last_name}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
          <RecipeGrid items={recipes} type="recipe" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
