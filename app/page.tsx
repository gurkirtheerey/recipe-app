import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
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
  PlaneLandingIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Main Content - Add padding-top to account for fixed navbar */}
      <div className="container mx-auto px-4 pt-24">
        <main className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Your Personal Recipe Companion
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Discover, save, and share delicious recipes. Plan your meals with
            ease and explore a world of culinary inspiration.
          </p>

          <div className="flex justify-center space-x-4 mb-16">
            <Link href="/signup">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-md"
              >
                Get Started - It&apos;s Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full"
              >
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Recipe Library
              </h3>
              <p className="text-gray-600">
                Organize and save your favorite recipes in one place
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Meal Planning
              </h3>
              <p className="text-gray-600">
                Plan your weekly meals and grocery lists effortlessly
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Share & Connect
              </h3>
              <p className="text-gray-600">
                Share recipes with friends and the community
              </p>
            </div>
          </div>
        </main>

        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-12">
            <main className="text-center">
              {/* Previous main content remains the same */}

              <section className="max-w-6xl mx-auto mt-16">
                <h3 className="text-3xl font-bold text-gray-800 mb-12">
                  Discover How Nibbl Transforms Your Cooking Experience
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-all">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Comprehensive Recipe Library
                    </h3>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center">
                        <Search className="w-5 h-5 mr-2 text-blue-500" />
                        Advanced recipe search with multiple filters
                      </li>
                      <li className="flex items-center">
                        <Tag className="w-5 h-5 mr-2 text-blue-500" />
                        Categorize recipes by cuisine, diet, and difficulty
                      </li>
                      <li className="flex items-center">
                        <Utensils className="w-5 h-5 mr-2 text-blue-500" />
                        Customize and save your personal recipes
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link href="/features/recipe-library">
                        <Button variant="link" className="text-blue-600 px-0">
                          Learn More About Recipe Library
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-all">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Smart Meal Planning
                    </h3>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center">
                        <PlaneLandingIcon className="w-5 h-5 mr-2 text-blue-500" />
                        Automated weekly meal plan suggestions
                      </li>
                      <li className="flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2 text-blue-500" />
                        Instant grocery list generation
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-500" />
                        Time-saving recipe recommendations
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link href="/features/meal-planning">
                        <Button variant="link" className="text-blue-600 px-0">
                          Explore Meal Planning Tools
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-all">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Share2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Share & Connect
                    </h3>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-500" />
                        Create and join recipe communities
                      </li>
                      <li className="flex items-center">
                        <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
                        Comment and discuss recipes
                      </li>
                      <li className="flex items-center">
                        <Share2 className="w-5 h-5 mr-2 text-blue-500" />
                        Easy recipe sharing across platforms
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link href="/features/share-connect">
                        <Button variant="link" className="text-blue-600 px-0">
                          Discover Community Features
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Previous footer code remains the same */}
          </div>
        </div>

        <footer className="mt-24 pt-16 pb-16 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Utensils className="w-6 h-6 text-blue-600" />
                <h4 className="text-xl font-bold text-gray-800">Nibbl</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Your ultimate recipe management and meal planning companion.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-4">Product</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-4">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/gurkirtheerey"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </Link>
                <Link
                  href="https://x.com/gurkirtheerey"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 5.587 12 7.01c-2.148-.195-4.517-1.114-5.907-2.859-.454 1.722.699 3.05 1.907 3.74C6.558 8.111 5.684 8.014 5 7.51c.084 1.804 1.211 2.747 2.66 3.185-.525.301-1.397.21-1.66.19.184 1.453 1.458 2.639 2.34 2.969-.646.752-2.03 1.289-3.34 1.121 1.09.684 2.123 1.19 3.54 1.404 1.789.225 4.034.003 5.47-1.141 1.742-1.389 2.965-3.696 3.428-6.151C20.696 7.54 21.68 6.709 22 4.01z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/gurkirtheerey"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-8 pt-4 border-t border-gray-200">
            &copy; {new Date().getFullYear()} Nibbl. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
