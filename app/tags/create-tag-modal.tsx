'use client';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import useTag from './useTag';
import { toast } from 'sonner';

const CreateTagModal = ({
  isOpen,
  onOpenChange,
  userId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}) => {
  const [name, setName] = useState('');
  const { createTag } = useTag(userId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length === 0) {
      toast.error('Name is required');
      return;
    } else {
      await createTag.mutateAsync(name);
      onOpenChange(false);
      setName('');
    }
  };

  return (
    <Modal
      title="Create tag"
      description="Tags are an easy way to organize your recipes. You can add them to recipes later or delete them if you don't need them."
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row justify-end space-y-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTagModal;
