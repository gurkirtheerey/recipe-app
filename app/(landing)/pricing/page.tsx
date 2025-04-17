import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, XCircle, Star } from 'lucide-react';
import React from 'react';

const PricingTier = ({
  title,
  price,
  frequency,
  description,
  features,
  isPopular = false,
  ctaText,
  ctaLink,
}: {
  title: string;
  price: string;
  frequency?: string;
  description: string;
  features: { name: string; included: boolean }[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}) => (
  <div
    className={`relative flex flex-col rounded-xl border ${isPopular ? 'border-blue-500 shadow-xl' : 'border-gray-200 shadow-sm'} p-8 bg-white`}
  >
    {isPopular && (
      <div className="absolute top-0 right-0 -mt-3 mr-3">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800">
          <Star className="mr-1.5 h-4 w-4 text-blue-500" />
          Most Popular
        </span>
      </div>
    )}
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-4 text-sm">{description}</p>
    <div className="mb-6">
      <span className="text-4xl font-extrabold text-gray-900">{price}</span>
      {frequency && <span className="text-base font-medium text-gray-500">{frequency}</span>}
    </div>
    <ul className="space-y-3 text-sm text-gray-600 mb-8 flex-grow">
      {features.map((feature) => (
        <li key={feature.name} className="flex items-center">
          {feature.included ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
          )}
          <span>{feature.name}</span>
        </li>
      ))}
    </ul>
    <Link href={ctaLink} className="mt-auto block w-full">
      <Button
        size="lg"
        variant={isPopular ? 'default' : 'outline'}
        className={`w-full ${isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
      >
        {ctaText}
      </Button>
    </Link>
  </div>
);

const PricingPage = () => {
  const tiers = [
    {
      title: 'Free',
      price: '$0',
      frequency: '/ month',
      description: 'Get started with the basics, perfect for individuals.',
      features: [
        { name: 'Up to 50 recipes', included: true },
        { name: 'Basic meal planning', included: true },
        { name: 'Shopping list generation', included: true },
        { name: 'Community access (read-only)', included: true },
        { name: 'AI Recipe Generation (Limited)', included: false },
        { name: 'Import recipes from URL', included: false },
        { name: 'Advanced search filters', included: false },
        { name: 'Custom cookbooks', included: false },
      ],
      ctaText: 'Start for Free',
      ctaLink: '/signup',
    },
    {
      title: 'Pro',
      price: '$9',
      frequency: '/ month',
      description: 'Unlock powerful features for the serious home cook.',
      features: [
        { name: 'Unlimited recipes', included: true },
        { name: 'Advanced meal planning & calendar sync', included: true },
        { name: 'Smart shopping lists with sorting', included: true },
        { name: 'Full community access & sharing', included: true },
        { name: 'AI Recipe Generation (Standard)', included: true },
        { name: 'Import recipes from URL', included: true },
        { name: 'Advanced search filters', included: true },
        { name: 'Unlimited custom cookbooks', included: true },
        { name: 'Priority support', included: true },
      ],
      isPopular: true,
      ctaText: 'Choose Pro',
      ctaLink: '/signup?plan=pro', // Example link
    },
    {
      title: 'Teams / Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for culinary schools, businesses, or large groups.',
      features: [
        { name: 'Everything in Pro, plus:', included: true },
        { name: 'Collaborative workspaces', included: true },
        { name: 'Centralized recipe management', included: true },
        { name: 'Custom branding options', included: true },
        { name: 'User roles & permissions', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'API access (optional add-on)', included: true },
        { name: 'Volume discounts', included: true },
      ],
      ctaText: 'Contact Sales',
      ctaLink: '/contact?inquiry=enterprise', // Example link
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
      {/* Assuming Navbar would go here if needed */}
      {/* <Navbar /> */}

      <main className="flex-grow">
        {/* Header Section */}
        <section className="pt-32 pb-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your culinary journey, from beginner to pro.
            </p>
          </div>
        </section>

        {/* Pricing Tiers Section */}
        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {tiers.map((tier) => (
              <PricingTier key={tier.title} {...tier} />
            ))}
          </div>
        </section>

        {/* FAQ Section (Optional but recommended) */}
        {/* <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
             Example FAQ Item
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be prorated.</p>
            </div>
             Add more FAQs here
          </div>
        </section> */}
      </main>

      {/* Assuming Footer would go here if needed */}
      {/* <Footer /> */}
    </div>
  );
};

export default PricingPage;
