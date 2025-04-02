import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Utensils, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">Nibbl</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              data-testid="features-link-navbar"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              data-testid="pricing-link-navbar"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="https://www.gurkirtheerey.com"
              data-testid="blog-link-navbar"
              target="_blank"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              data-testid="about-link-navbar"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" data-testid="login-link-navbar">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Login
              </Button>
            </Link>
            <Link href="/signup" data-testid="signup-link-navbar">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="px-6">
              <SheetHeader className="pb-4">
                <SheetTitle className="text-2xl">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-8">
                <Link
                  href="/features"
                  data-testid="features-link-navbar"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-lg py-2"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  data-testid="pricing-link-navbar"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-lg py-2"
                >
                  Pricing
                </Link>
                <Link
                  href="https://www.gurkirtheerey.com"
                  target="_blank"
                  data-testid="blog-link-navbar"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-lg py-2"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  data-testid="about-link-navbar"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-lg py-2"
                >
                  About
                </Link>
                <div className="flex flex-col space-y-4 mt-4 pt-6 border-t border-gray-100">
                  <Link href="/login" className="w-full">
                    <Button variant="ghost" className="w-full text-gray-600 hover:text-blue-600 text-lg h-12">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
