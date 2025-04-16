import { createClient } from '@/lib/supabase/server';
import { getMyRecipes } from '@/app/recipes/actions';
import { RecipeGrid } from '@/components/Recipe/RecipeGrid';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import Error from './error';
const ProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { username: usernameParam } = await params;
  const { data: user, error } = await supabase.from('profiles').select('*').eq('username', usernameParam).single();

  if (error || !user) {
    return <Error />;
  }

  const { id, first_name, last_name, username, profile_picture } = user;

  const recipes = await getMyRecipes(id);

  return (
    <>
      {!data.user && (
        <div className="mb-20">
          <Navbar />
        </div>
      )}
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <Image
              src={profile_picture || `https://ui-avatars.com/api/?name=${first_name}+${last_name}`}
              alt={username}
              className="w-24 h-24 rounded-full mb-4"
              width={96}
              height={96}
            />
            <h1 className="text-3xl font-bold">{username}</h1>
            <p className="text-muted-foreground">
              {first_name} {last_name}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{first_name}&apos;s Recipes</h2>
            <RecipeGrid items={recipes} type="recipe" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
