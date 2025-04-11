import Image from 'next/image';
import { PlusIcon } from 'lucide-react';
import { Recipe } from '@/types/recipeTypes';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import Link from 'next/link';
interface DiscoverCardProps {
  item: Recipe;
}

// Helper function to calculate how long ago a post was made
export function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMillis = now.getTime() - past.getTime();

  const minutes = Math.floor(diffInMillis / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  if (months > 0) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  if (hours > 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  return 'just now';
}

export function DiscoverCard({ item }: DiscoverCardProps) {
  const timePosted = timeAgo(item.created_at as string);
  return (
    <div className="w-full sm:w-1/2 md:w-2/3 lg:w-1/2">
      <div className="sm:rounded-lg overflow-hidden shadow-lg bg-slate-400 text-white mb-6">
        <Link href={`/recipes/${item.id}`} className="block">
          <div className="relative h-72 md:h-84 w-full">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill className="object-cover" priority />
            ) : (
              <div className="flex items-center justify-center h-full">
                <PlusIcon className="h-10 w-10 text-gray-400" />
              </div>
            )}
          </div>
        </Link>

        <div className="h-46 flex flex-col p-4 space-y-2">
          {/* Buttons */}
          <div className="flex justify-between items-center">
            <FavoriteButton type="post" id={item.id} />
            <ShareButton id={item.id} title={item.title} />
          </div>

          <Link href={`/recipes/${item.id}`} className="text-xl font-bold hover:underline">
            {item.title}
          </Link>

          <p className="text-gray-800 text-sm line-clamp-2 min-h-[3em]">{item.description}</p>
          <p className="text-gray-800 text-xs">{timePosted}</p>
        </div>
      </div>
    </div>
  );
}
