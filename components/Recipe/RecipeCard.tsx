'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Recipe, type Collection, type RecipeCardProps } from '@/types/recipeTypes';
import Link from 'next/link';
import Image from 'next/image';

export function RecipeCard({ item, type, className = '' }: RecipeCardProps) {
  return (
    <Link href={`/${type}s/${item.id}`} className="block h-full">
      <Card className={`h-full hover:shadow-lg transition-all duration-300 ${className} p-0`}>
        <CardHeader className="p-0">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg relative">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-3 sm:p-4">
            <CardTitle className="line-clamp-1 text-base sm:text-lg">{item.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="hidden sm:block p-3 sm:p-4">
          {type === 'recipe' ? (
            <p className="text-sm text-muted-foreground line-clamp-2">{(item as Recipe).description}</p>
          ) : (
            <p className="text-sm text-muted-foreground">{(item as Collection).recipeCount} recipes</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
