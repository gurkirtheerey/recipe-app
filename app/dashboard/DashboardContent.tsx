'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CreateRecipeModal from '@/components/Recipe/CreateRecipeModal';

export default function DashboardContent() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between p-4 w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex justify-center gap-4">
          <Button>Discover</Button>
          <Button onClick={() => setOpen((prev) => !prev)} variant="outline">
            Create Recipe
          </Button>
        </div>
      </div>
      {open && <CreateRecipeModal open={open} setOpen={setOpen} />}
    </>
  );
}
