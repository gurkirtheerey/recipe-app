import { notFound } from 'next/navigation';
import { getRecipeById } from '../actions';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import BackButton from '@/components/BackButton';

type RecipeParams = Promise<{
  id: string;
}>;

export default async function RecipePage({ params }: { params: RecipeParams }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <div className="relative">
        {/* Navigation Buttons */}
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>

        {/* Recipe Image */}
        {recipe.image && (
          <div className="relative h-[300px] sm:h-[400px] w-full">
            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        )}
      </div>

      <div className="-mt-8 relative z-20">
        <div className="bg-white rounded-t-3xl px-6 pt-8 pb-20 max-w-3xl mx-auto shadow-sm">
          {/* Recipe Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{recipe.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{recipe.prepTime} mins</span>
              </div>
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
