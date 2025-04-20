'use client';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import useTag from './useTag';
import { toast } from 'sonner';
import { TagWithRecipes } from './tags-content';

const EditTagModal = ({
  isOpen,
  onOpenChange,
  tag,
  userId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tag: TagWithRecipes;
  userId: string;
}) => {
  const [name, setName] = useState('');
  const { updateTag, deleteTag } = useTag(userId);

  useEffect(() => {
    setName(tag.name);
  }, [tag]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length === 0) {
      toast.error('Name is required');
      return;
    } else {
      await updateTag.mutateAsync({ id: tag.id, name });
      onOpenChange(false);
      setName('');
    }
  };

  const recipes = tag.recipe_tags.map((recipeTag) => recipeTag.recipes).flat();

  return (
    <Modal
      title="Edit tag"
      description="Edit the name of the tag. You can also delete the tag. This action is irreversible."
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row justify-end space-y-2 mt-4">
          <Button disabled={deleteTag.isPending} variant="outline" onClick={() => deleteTag.mutateAsync(tag.id)}>
            Delete
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium mb-2">Recipes with this tag:</h2>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3 className="text-lg font-medium mb-2 line-clamp-1">{recipe.title}</h3>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default EditTagModal;
