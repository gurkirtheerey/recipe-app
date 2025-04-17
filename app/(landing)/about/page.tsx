import React from 'react';
import { Utensils, Heart, Lightbulb, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// Import Navbar and Footer if you have them and want them on this page
// import Navbar from '@/components/navbar';
// import Footer from '@/components/footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      {/* <Navbar /> */}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 text-center bg-white">
          <div className="container mx-auto px-4">
            <Utensils className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">About Nibbl</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Cooking made simple, organized, and joyful. Discover the story behind your favorite recipe companion.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At Nibbl, our mission is to empower home cooks of all levels to explore their creativity in the kitchen.
              We believe that cooking should be an accessible and enjoyable experience, not a chore. We strive to
              provide intuitive tools that simplify meal planning, recipe organization, and grocery shopping, freeing
              you up to focus on the joy of creating delicious food.
            </p>
          </div>
        </section>

        {/* Why Nibbl Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why We Built Nibbl</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Passion for Food</h3>
                <p className="text-gray-600 text-sm">
                  We&apos;re food lovers ourselves! We wanted a better way to manage the recipes we collected from
                  family, friends, and online, often scattered across notes and bookmarks.
                </p>
              </div>
              <div className="text-center">
                <Lightbulb className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Solving a Problem</h3>
                <p className="text-gray-600 text-sm">
                  Meal planning felt chaotic, shopping lists were a hassle, and finding that *one* recipe was often a
                  frustrating search. We knew there had to be a smarter way.
                </p>
              </div>
              <div className="text-center">
                <Users className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Building Community</h3>
                <p className="text-gray-600 text-sm">
                  Cooking is often better shared. We envisioned a space where cooks could connect, share their successes
                  (and failures!), and inspire each other.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section (Placeholder) */}
        {/* You can replace this with actual team info later */}
        {/* <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Users className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet the Team</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Nibbl is built by a small, passionate team dedicated to making your kitchen life easier. We love food, technology, and helping people connect through cooking.
            </p>
             Add team member cards or photos here if desired
          </div>
        </section> */}

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Nibbl Community</h2>
            <p className="text-lg text-blue-100 max-w-xl mx-auto mb-10">
              Ready to simplify your cooking and discover new favorites? Explore Nibbl&apos;s features or sign up today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full w-full sm:w-auto"
                >
                  Explore Features
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg w-full sm:w-auto"
                >
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default AboutPage;
