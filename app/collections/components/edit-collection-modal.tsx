'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Collection } from '@/types';
import { useEffect } from 'react';
import { useCollections } from '../useCollections';
import Modal from '@/components/Modal';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
const EditCollectionModal = ({
  collection,
  setIsEditCollectionOpen,
}: {
  collection: Collection;
  setIsEditCollectionOpen: (collection: Collection | null) => void;
}) => {
  const isMobile = useIsMobile();
  const { handleUpdateCollection } = useCollections();
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    form.reset(collection);
  }, [form, collection]);

  const onSubmit = async (data: { name: string; description: string }) => {
    await handleUpdateCollection.mutateAsync({ id: collection.id, ...data });
    setIsEditCollectionOpen(null);
    form.reset();
  };
  return (
    <Modal
      title="Edit Collection"
      description="Make changes to the collection here. Press enter to save when done."
      open={!!collection}
      onOpenChange={() => setIsEditCollectionOpen(null)}
    >
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            type="text"
            {...form.register('name', { required: 'Collection name is required' })}
            disabled={handleUpdateCollection.isPending}
          />
          {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Input type="text" {...form.register('description')} disabled={handleUpdateCollection.isPending} />
        </div>
        <div className="flex flex-col sm:gap-0 gap-2 sm:mb-0 mb-4">
          <Button type="submit" disabled={handleUpdateCollection.isPending}>
            {handleUpdateCollection.isPending ? 'Saving...' : 'Save changes'}
          </Button>
          {isMobile && (
            <Button type="button" variant="outline" onClick={() => setIsEditCollectionOpen(null)}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default EditCollectionModal;
