'use client';

import React from 'react';
import { Button } from './ui/button';
import { Share2 } from 'lucide-react';

const ShareButton = ({ id, title }: { id: string; title: string }) => {
  const shareData = {
    title: `Check out this ${title} recipe on Nibbl! `,
    url: `/recipes/${id}`,
  };
  return (
    <Button
      onClick={() => navigator.share(shareData)}
      className="p-0 has-[>svg]:p-0 bg-transparent shadow-none hover:bg-transparent hover:text-gray-300"
    >
      <Share2 />
    </Button>
  );
};

export default ShareButton;
