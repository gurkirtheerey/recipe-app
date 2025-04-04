'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="p-2 bg-gray-200 rounded-full">
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
};

export default BackButton;
