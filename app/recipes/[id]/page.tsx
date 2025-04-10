import { notFound } from 'next/navigation';
import { getRecipeById } from '../actions';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import BackButton from '@/components/BackButton';
import { StarRating } from '@/components/StarRating';
import FavoriteButton from '@/components/FavoriteButton';
type RecipeParams = Promise<{
  id: string;
}>;

export default async function RecipePage({ params }: { params: RecipeParams }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const totalTimeInMinutes: number = recipe.total_time ?? 0;
  const hours: number = Math.floor(totalTimeInMinutes / 60);
  const minutes: number = totalTimeInMinutes % 60;
  // e.g., "1 hour 30 minutes"
  const formattedTime: string = `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <div className="relative">
        {/* Navigation Buttons */}
        <div className="absolute z-10 w-full p-4 flex items-center justify-between">
          <BackButton />
          <FavoriteButton />
        </div>

        {/* Recipe Image */}
        {recipe.image ? (
          <div className="relative h-[300px] sm:h-[400px] w-full">
            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        ) : (
          <div className="relative h-[300px] sm:h-[400px] w-full bg-gray-200">
            <div className="flex items-center justify-center h-full">
              <PlusIcon className="h-10 w-10 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      <div className="-mt-8 relative z-20">
        <div className="bg-white rounded-t-3xl px-6 pt-8 pb-20 max-w-3xl mx-auto shadow-sm">
          {/* Recipe Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{recipe.title}</h1>
              <StarRating initialRating={recipe.rating} recipeId={recipe.id} />
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
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
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Ingredients</h2>
            <ul className="space-y-4">
              {recipe.ingredients?.map((ingredient: string, index: number) => (
                <li key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-800">{ingredient}</span>
                  </div>
                  <span className="text-gray-500">160g</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-lg font-medium mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions?.map((step: string, index: number) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-600 text-sm">
                    {index + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
