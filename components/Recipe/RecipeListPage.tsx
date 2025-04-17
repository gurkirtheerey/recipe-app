import { RecipeGrid } from '@/components/Recipe/RecipeGrid';
import { Recipe } from '@/types';

interface RecipeListPageProps {
  title: string;
  items?: Recipe[];
  type: 'recipe';
}

export function RecipeListPage({ title, items, type }: RecipeListPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">{title}</h1>
        <RecipeGrid items={items} type={type} />
      </div>
    </main>
  );
}
