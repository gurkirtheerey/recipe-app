import { notFound } from 'next/navigation';
import { getRecipeById } from '../actions';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import BackButton from '@/components/BackButton';
import { StarRating } from '@/components/StarRating';
import FavoriteButton from '@/components/FavoriteButton';
import { RecipeWithFavorites } from '@/types/recipeTypes';
import EditRecipeModal from '@/app/recipes/EditRecipeModal';
import DeleteRecipeButton from '@/components/Recipe/DeleteRecipeButton';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Ingredients from './ingredients';
import CommentForm from './comment-form';
import RecipeTagModal from './recipe-tag-modal';
import NutritionLabel from '@/components/NutritionLabel';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
type RecipeParams = Promise<{
  id: string;
}>;

export default async function RecipePage({ params }: { params: RecipeParams }) {
  const supabase = await createClient();
  const { id } = await params;
  const recipe: RecipeWithFavorites | null = await getRecipeById(id);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase.from('profiles').select('username').eq('id', recipe?.user_id).single();
  if (!user) {
    redirect('/login');
  }

  if (!recipe) {
    notFound();
  }

  const isOwner = recipe.user_id === user.id;

  const totalTimeInMinutes: number = recipe.total_time ?? 0;
  const hours: number = Math.floor(totalTimeInMinutes / 60);
  const minutes: number = totalTimeInMinutes % 60;
  // e.g., "1 hour 30 minutes"
  const formattedTime: string = `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;

  return (
    <main className="min-h-screen bg-[#f8f8f8] dark:bg-black">
      <div className="relative">
        {/* Navigation Buttons */}
        <div className="absolute z-10 w-full p-4 flex items-center justify-between">
          <BackButton />
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 px-3 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer">
              <ShareButton id={recipe.id} name={recipe.title} type="recipes" />
            </div>
            <FavoriteButton type="recipe" id={recipe.id} isFavorite={recipe?.favorites?.[0]?.is_favorite} />
            {isOwner && <DeleteRecipeButton recipeId={recipe.id} />}
          </div>
        </div>

        {/* Recipe Image */}
        {recipe.image ? (
          <div className="relative h-[300px] sm:h-[400px] w-full">
            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        ) : (
          <div className="relative h-[300px] sm:h-[400px] w-full bg-gray-200 dark:bg-gray-900">
            <div className="flex items-center justify-center h-full">
              <PlusIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
            </div>
          </div>
        )}
      </div>

      <div className="-mt-8 relative z-20">
        <div className="bg-white dark:bg-gray-950 rounded-t-3xl px-6 pt-8 pb-20 max-w-3xl mx-auto shadow-sm dark:shadow-black/50">
          {/* Recipe Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-start justify-between sm:justify-start w-full">
                <h1 className="text-xl sm:text-3xl font-semibold mb-2 sm:mr-3 mr-0 line-clamp-1 text-gray-900 dark:text-gray-100">
                  {recipe.title}
                </h1>
                <div className="flex items-center gap-2">
                  <EditRecipeModal recipe={recipe} isOwner={isOwner} />
                  {isOwner && <RecipeTagModal recipeId={recipe.id} />}
                </div>
              </div>
              <div className="mt-2 mb-4 sm:mt-0 sm:mb-0">
                <StarRating initialRating={recipe.rating} recipeId={recipe.id} />
              </div>
            </div>
            {/* Recipe Details */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>Prep Time: {recipe.prep_time} mins</span>
              </div>
              {recipe.cook_time && (
                <div className="flex items-center gap-2">
                  <span>Cook Time: {recipe.cook_time} mins</span>
                </div>
              )}
              {recipe.prep_time && recipe.cook_time && (
                <div className="flex items-center gap-2">
                  <span>
                    Total Time:{' '}
                    {recipe.total_time && recipe.total_time < 60 ? `${recipe.total_time} mins` : formattedTime}
                  </span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2">
                  <span>Serves: {recipe.servings}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>
                Created By:{' '}
                <Link
                  target="_blank"
                  href={`/profile/${userData?.username}`}
                  className="font-bold tracking-wide text-lg hover:text-gray-600 dark:hover:text-gray-400 hover:underline"
                >
                  {userData?.username}
                </Link>{' '}
                on {new Date(recipe.created_at).toLocaleDateString()} {recipe.is_ai_generated && '(AI-Generated)'}
              </span>
            </div>
          </div>
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{recipe.description}</p>
          </div>

          {/* Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Ingredients ingredients={recipe.ingredients} />

            {/* Instructions */}
            <div>
              <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions?.map((step: string, index: number) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {/* Nutrition */}
          <div className="my-10">
            <NutritionLabel nutrition={recipe.nutrition} servings={recipe.servings} />
          </div>
          {/* Comments */}
          <div className="my-10">
            <h2 className="text-lg font-medium mb-4">Comments</h2>
            <div>
              <CommentForm recipeId={recipe.id} userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
