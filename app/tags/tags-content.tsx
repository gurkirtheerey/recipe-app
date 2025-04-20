'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Tag } from '@/types';
import { PlusIcon, Pencil } from 'lucide-react';
import CreateTagModal from './create-tag-modal';
import EditTagModal from './edit-tag-modal';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export type TagWithRecipes = Tag & {
  recipe_tags: {
    recipes: {
      id: string;
      title: string;
      description: string;
    }[];
  }[];
};

const TagsContent = ({ userId }: { userId: string }) => {
  const supabase = createClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagWithRecipes | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ['tags', userId],
    queryFn: async () => {
      const { data, error } = await supabase.from('tags').select(`
            id,
            name,
            recipe_tags (
              recipes (
                id,
                title,
                description
              )
            )
          `);
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  console.log(data);

  return (
    <div className="p-4 sm:mt-0 my-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tags</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Tag
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {data.map((tag: TagWithRecipes) => (
          <div key={tag.id} className="flex justify-between gap-2 rounded-md border p-2 h-32 sm:w-64 w-full">
            <div>
              <h2 className="text-lg font-bold">{tag.name}</h2>
              <p className="text-sm text-gray-500">{tag.recipe_tags.length} recipes </p>
            </div>
            <Button
              className="h-8 w-8"
              variant="outline"
              size="icon"
              onClick={() => {
                setIsEditOpen(true);
                setSelectedTag(tag);
              }}
            >
              <Pencil />
            </Button>
          </div>
        ))}
      </div>
      <CreateTagModal isOpen={isCreateOpen} onOpenChange={setIsCreateOpen} userId={userId} />
      {selectedTag && (
        <EditTagModal isOpen={isEditOpen} onOpenChange={setIsEditOpen} tag={selectedTag} userId={userId} />
      )}
    </div>
  );
};

export default TagsContent;
