'use client';

import React from 'react';
import { Button } from './ui/button';
import { Share, Share2 } from 'lucide-react';

const ShareButton = ({ id, name, type }: { id: string; name: string; type: string }) => {
  let isSharing = false;

  const shareDataHandler = () => {
    if (isSharing) return;
    isSharing = true;

    navigator
      .share({
        title: type === 'recipe' ? `Check out this ${name} recipe on Nibbl!` : `Check out ${name}'s profile on Nibbl!`,
        url: `${window.location.origin}/${type}/${type === 'recipes' ? id : name}`,
      })
      .then(() => {
        console.log('Shared successfully');
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('User canceled the share');
        } else {
          console.error('Share failed:', error);
        }
      })
      .finally(() => {
        isSharing = false;
      });
  };

  return (
    <Button
      onClick={shareDataHandler}
      className="p-0 text-gray-800 has-[>svg]:p-0 bg-transparent shadow-none hover:bg-transparent hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
    >
      {type === 'recipe' ? <Share2 /> : <Share />}
    </Button>
  );
};

export default ShareButton;
