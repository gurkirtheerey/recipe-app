import { Input, Label, Button } from '@/components/ui';
import { useCollections } from '../useCollections';
import { useForm } from 'react-hook-form';
import Modal from '@/components/Modal';
import { useIsMobile } from '@/hooks/use-mobile';
const CreateCollectionModal = ({
  isCreateOpen,
  setIsCreateOpen,
}: {
  isCreateOpen: boolean;
  setIsCreateOpen: (isOpen: boolean) => void;
}) => {
  const isMobile = useIsMobile();
  const { handleCreateCollection } = useCollections();
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: { name: string; description: string }) => {
    await handleCreateCollection.mutateAsync(data);
    setIsCreateOpen(false);
    form.reset();
  };

  return (
    <Modal
      title="Create Collection"
      description="This will create a new collection with the name and description you provide. You can add recipes to the collection later."
      open={isCreateOpen}
      onOpenChange={setIsCreateOpen}
    >
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label>Name </Label>
          <Input
            type="text"
            {...form.register('name', { required: 'Collection name is required' })}
            disabled={handleCreateCollection.isPending}
          />
          {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Description </Label>
          <Input type="text" {...form.register('description')} disabled={handleCreateCollection.isPending} />
        </div>
        <div className="flex flex-col gap-2 sm:mb-0 mb-4">
          <Button type="submit" disabled={handleCreateCollection.isPending}>
            {handleCreateCollection.isPending ? 'Creating...' : 'Create Collection'}
          </Button>
          {isMobile && (
            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateCollectionModal;
