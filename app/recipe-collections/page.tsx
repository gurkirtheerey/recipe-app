import { collections } from "@/app/data/dummy-recipes";
import { RecipeCard } from "@/components/RecipeCard";

export default function RecipeCollectionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Recipe Collections</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <RecipeCard
              key={collection.id}
              item={collection}
              type="collection"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
