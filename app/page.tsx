import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Utensils,
  BookOpen,
  Clock,
  Share2,
  Search,
  Tag,
  ShoppingCart,
  Users,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/landing/Footer';
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <Navbar />
      {/* Main Content - Add padding-top to account for fixed navbar */}
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Your Culinary Journey Starts Here
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Nibbl helps you discover amazing recipes, plan your meals effortlessly, and share your culinary creations with
          a vibrant community.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-20">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full sm:w-auto"
            >
              Get Started - It&apos;s Free
            </Button>
          </Link>
          {/* Demo button styling can be adjusted if needed */}
          {/* <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-3 rounded-full w-full sm:w-auto transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                Watch Demo
              </Button>
            </Link> */}
        </div>
      </section>

      {/* Initial Feature Highlights (Simpler version) */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Card 1: Recipe Library */}
          <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Recipe Library</h3>
            <p className="text-gray-600">
              Organize and easily access all your favorite recipes in one beautiful space.
            </p>
          </div>
          {/* Card 2: Meal Planning */}
          <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Meal Planning</h3>
            <p className="text-gray-600">Plan your weekly meals and generate shopping lists in just a few clicks.</p>
          </div>
          {/* Card 3: Share & Connect */}
          <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform duration-300">
              <Share2 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Share & Connect</h3>
            <p className="text-gray-600">Share your culinary masterpieces and discover recipes from the community.</p>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
            Why You&apos;ll Love <span className="text-blue-600">Nibbl</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-left hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
              <div className="bg-blue-100 rounded-lg w-16 h-16 flex items-center justify-center mb-5 flex-shrink-0">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Comprehensive Recipe Library</h3>
              <ul className="text-gray-600 space-y-3 mb-6 flex-grow">
                <li className="flex items-start">
                  <Search className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Advanced search & filtering (cuisine, diet, difficulty).</span>
                </li>
                <li className="flex items-start">
                  <Tag className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Organize with custom tags and collections.</span>
                </li>
                <li className="flex items-start">
                  <Utensils className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Easily add, edit, and import your own recipes.</span>
                </li>
              </ul>
              <Link href="/features#recipe-library" className="mt-auto">
                <Button variant="link" className="text-blue-600 px-0 font-medium hover:text-blue-700">
                  Learn More &rarr;
                </Button>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-left hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
              <div className="bg-green-100 rounded-lg w-16 h-16 flex items-center justify-center mb-5 flex-shrink-0">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Meal Planning</h3>
              <ul className="text-gray-600 space-y-3 mb-6 flex-grow">
                <li className="flex items-start">
                  <Sparkles className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>AI-powered weekly meal plan suggestions.</span>
                </li>
                <li className="flex items-start">
                  <ShoppingCart className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>Automatic grocery list generation based on your plan.</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>Adjust servings and sync with your calendar.</span>
                </li>
              </ul>
              <Link href="/features#meal-planning" className="mt-auto">
                <Button variant="link" className="text-green-600 px-0 font-medium hover:text-green-700">
                  Learn More &rarr;
                </Button>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-left hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
              <div className="bg-purple-100 rounded-lg w-16 h-16 flex items-center justify-center mb-5 flex-shrink-0">
                <Share2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Share & Connect</h3>
              <ul className="text-gray-600 space-y-3 mb-6 flex-grow">
                <li className="flex items-start">
                  <Users className="w-5 h-5 mr-3 text-purple-500 mt-1 flex-shrink-0" />
                  <span>Join communities based on interests and cuisines.</span>
                </li>
                <li className="flex items-start">
                  <MessageCircle className="w-5 h-5 mr-3 text-purple-500 mt-1 flex-shrink-0" />
                  <span>Rate, review, and discuss recipes with others.</span>
                </li>
                <li className="flex items-start">
                  <Share2 className="w-5 h-5 mr-3 text-purple-500 mt-1 flex-shrink-0" />
                  <span>Easily share your favorite recipes on social media.</span>
                </li>
              </ul>
              <Link href="/features#share-connect" className="mt-auto">
                <Button variant="link" className="text-purple-600 px-0 font-medium hover:text-purple-700">
                  Learn More &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Cooking?</h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of food lovers who use Nibbl to organize their recipes, plan meals, and connect with a
            passionate community.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Sign Up for Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
