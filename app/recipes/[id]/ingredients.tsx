'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Ingredients component
 * @param ingredients - The ingredients to display
 * @returns A React component displaying the ingredients
 */
const Ingredients = ({ ingredients }: { ingredients: string[] }) => {
  const handleClick = useMutation({
    mutationFn: async (ingredient: string) => {
      const res = await fetch(`/api/shopping-list`, {
        method: 'POST',
        body: JSON.stringify({ name: ingredient }),
      });
      const { data, error } = await res.json();
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.success('Ingredient added to shopping list');
      return data;
    },
  });

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Ingredients</h2>
      <ul className="space-y-4">
        {ingredients?.map((ingredient: string, index: number) => (
          <li
            key={index}
            className={`flex items-center text-gray-800 py-2 border-b border-gray-100 dark:text-gray-200 dark:border-gray-700 ${
              handleClick.isPending ? 'cursor-not-allowed animate-pulse !text-gray-400' : 'cursor-pointer'
            }`}
            onClick={() => handleClick.mutate(ingredient)}
          >
            <span className="">{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
