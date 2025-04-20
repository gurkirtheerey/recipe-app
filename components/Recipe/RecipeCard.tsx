'use client';
import { type RecipeCardProps } from '@/types/recipeTypes';
import Link from 'next/link';
import Image from 'next/image';
import { PlusIcon } from 'lucide-react';
export function RecipeCard({ item, type, className = '' }: RecipeCardProps) {
  return (
    <Link href={`/${type}s/${item.id}`} className="block h-full">
      <div className={`h-full transition-all duration-300 ${className} p-0`}>
        <div className="aspect-square w-full overflow-hidden rounded-sm relative">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="aspect-square w-full overflow-hidden rounded-sm relative bg-gray-200">
              <div className="flex items-center justify-center h-full">
                <PlusIcon className="h-10 w-10 text-gray-400" />
              </div>
            </div>
          )}
        </div>
        <div className="font-bold sm:text-lg text-sm hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
          {item.title}
        </div>
      </div>
    </Link>
  );
}
