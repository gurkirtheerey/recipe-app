import {
  ShoppingCart, // Shopping Lists
  BookPlus, // Create Recipes
  BookMarked, // Cookbooks
  CalendarDays, // Meal Planning
  Users, // Community
  Search, // Search
  Filter, // Filtering
  BrainCircuit, // AI
  ChefHat, // Chef/Cooking theme
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'; // Import React for types
// Define props type for FeatureCard
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, bgColor, iconColor }) => (
  <div
    className={`bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col text-center items-center`}
  >
    <div className={`${bgColor} rounded-full w-16 h-16 flex items-center justify-center mb-5 flex-shrink-0`}>
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm flex-grow">{description}</p>
  </div>
);

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 via-white to-white pt-32 pb-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Explore Nibbl&apos;s Features</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock a world of culinary possibilities with powerful tools designed for every home cook.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={BrainCircuit}
              title="AI Recipe Generation"
              description="Stuck for ideas? Let our AI generate unique recipes based on ingredients you have, dietary needs, or desired cuisine."
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Smart Shopping Lists"
              description="Automatically create organized shopping lists from your recipes or meal plan. Check items off as you shop."
              bgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <FeatureCard
              icon={BookPlus}
              title="Create & Import Recipes"
              description="Easily add your own family recipes, import from websites with a click, or modify existing ones to perfection."
              bgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <FeatureCard
              icon={BookMarked}
              title="Organize with Cookbooks"
              description="Group your recipes into custom digital cookbooks for holidays, specific diets, or personal collections."
              bgColor="bg-yellow-100"
              iconColor="text-yellow-600"
            />
            <FeatureCard
              icon={CalendarDays}
              title="Effortless Meal Planning"
              description="Plan your week's meals visually. Drag and drop recipes onto your calendar and see nutritional info at a glance."
              bgColor="bg-red-100"
              iconColor="text-red-600"
            />
            <FeatureCard
              icon={Users}
              title="Community & Sharing"
              description="Connect with fellow foodies, share your creations, discover new recipes, and leave reviews."
              bgColor="bg-indigo-100"
              iconColor="text-indigo-600"
            />
            <FeatureCard
              icon={Search}
              title="Advanced Search & Filter"
              description="Quickly find recipes by ingredients, tags, cooking time, nutritional information, and more."
              bgColor="bg-pink-100"
              iconColor="text-pink-600"
            />
            <FeatureCard
              icon={Filter}
              title="Dietary & Allergy Filters"
              description="Filter recipes based on common diets (vegan, keto, gluten-free) and specific allergies."
              bgColor="bg-teal-100"
              iconColor="text-teal-600"
            />
            <FeatureCard
              icon={ChefHat}
              title="Cooking Mode"
              description="A distraction-free view designed for the kitchen, keeping your screen awake and steps easy to follow."
              bgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>
        </section>

        {/* Call to Action (Optional, similar to landing) */}
        <section className="bg-blue-600 text-white py-20 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Kitchen?</h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Start your free journey with Nibbl today and explore all these features and more.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default FeaturesPage;
