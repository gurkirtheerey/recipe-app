import { Button } from '@/components/ui';
import { Collection } from '@/types';
import { useCollections } from '../useCollections';
import Modal from '@/components/Modal';
import { useIsMobile } from '@/hooks/use-mobile';
const DeleteCollectionModal = ({
  isDeleteCollectionOpen,
  setIsDeleteCollectionOpen,
}: {
  isDeleteCollectionOpen: Collection | null;
  setIsDeleteCollectionOpen: (isOpen: Collection | null) => void;
}) => {
  const isMobile = useIsMobile();
  const { handleDeleteCollection } = useCollections();
  const onDeleteCollection = async (collection: Collection) => {
    await handleDeleteCollection.mutateAsync(collection);
    setIsDeleteCollectionOpen(null);
  };
  return (
    <Modal
      title="Delete Collection"
      description="Are you sure you want to delete this collection? Deleting a collection will remove it from your account and all associated recipes. This action cannot be undone."
      open={isDeleteCollectionOpen !== null}
      onOpenChange={() => setIsDeleteCollectionOpen(null)}
    >
      <div className="flex flex-col gap-2 sm:mb-0 mb-4">
        <Button
          type="submit"
          variant="destructive"
          onClick={() => onDeleteCollection(isDeleteCollectionOpen as Collection)}
          disabled={handleDeleteCollection.isPending}
        >
          {handleDeleteCollection.isPending ? 'Deleting...' : 'Delete Collection'}
        </Button>
        {isMobile && (
          <Button type="button" variant="outline" onClick={() => setIsDeleteCollectionOpen(null)}>
            Cancel
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default DeleteCollectionModal;
