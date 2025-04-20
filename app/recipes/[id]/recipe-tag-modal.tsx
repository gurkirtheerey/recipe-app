'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Tag as TagIcon } from 'lucide-react';
import { Tag } from '@/types';
import ModalItem from '@/components/modal-item';
import useTag from '@/app/tags/useTag';

const RecipeTagModal = ({ recipeId }: { recipeId: string }) => {
  const { addTagsToRecipe, getTagsForRecipe } = useTag(null, recipeId);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);

  // Get tags for the recipe
  const { data: tagData, isLoading, error } = getTagsForRecipe;

  // Get the selected tags for the recipe and set them in state so we can display them in the modal
  useEffect(() => {
    if (tagData) {
      const { tags, recipeTags } = tagData;
      setSelectedTags(recipeTags.map((tag) => tags.find((t) => t.id === tag.tag_id)));
    }
  }, [tagData]);

  // Handle click on a tag to add or remove it from the recipe
  const handleClick = (tag: Tag) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async () => {
    await addTagsToRecipe.mutateAsync({ recipeId, selectedTags });
    setOpen(false);
  };

  if (!tagData) {
    return null;
  }

  return (
    <>
      <Button variant="outline" size="icon" className="rounded-full" onClick={() => setOpen(true)}>
        <TagIcon className="w-4 h-4" />
      </Button>
      <Modal title="Add Tag" description="Add a tag to the recipe" open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            tagData.tags.map((tag: Tag) => (
              <ModalItem<Tag>
                key={tag.id}
                item={tag}
                handleClick={handleClick}
                selectedItems={selectedTags}
                renderLabel={(tag) => tag.name}
                selectedIcon={<BadgeCheck className="w-4 h-4" />}
              />
            ))
          )}
        </div>
        <Button className="my-4" onClick={() => handleSubmit()} disabled={addTagsToRecipe.isPending}>
          {addTagsToRecipe.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </Modal>
    </>
  );
};

export default RecipeTagModal;
