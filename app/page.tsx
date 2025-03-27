import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Utensils,
  Github,
  Twitter,
  Instagram,
  ChefHat,
  Clock,
  Users,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="absolute inset-0 bg-grid-blue-100 [mask-image:linear-gradient(0deg,white,transparent)]" />
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ChefHat className="w-8 h-8 text-blue-600" />
                <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Nibbl
                </h1>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Your personal recipe companion. Discover, save, and create
              delicious recipes with ease.
            </p>
            <div className="flex justify-center w-full">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all duration-200 rounded-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-50 hover:border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Utensils className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Save Recipes
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Keep your favorite recipes organized in one place
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-50 hover:border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Clock className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Meal Planning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Plan your meals and organize your cooking schedule
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-50 hover:border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Share & Connect
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Share your recipes with friends and family
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-blue-100 py-16 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ChefHat className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-600">Nibbl</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your personal recipe companion for organizing and sharing
                delicious recipes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-6 text-lg">
                Product
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-6 text-lg">
                Resources
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-6 text-lg">
                Connect
              </h4>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/gurkirtheerey"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/gurkirtheerey"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/gurkirtheerey"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-100 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Nibbl. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
