'use client';
import { useState } from 'react';
import { Collection } from '@/types';
import Loading from './loading';
import Link from 'next/link';
import EditCollectionModal from './components/edit-collection-modal';
import { useCollections } from './useCollections';
import DeleteCollectionModal from './components/delete-collection-modal';
import CreateCollectionModal from './components/create-collection-modal';
import { ContextMenu } from '@/components/ui';
import { ContextMenuContent, ContextMenuTrigger } from '@/components/ui';
import { ContextMenuItem } from '@/components/ui';
import { Button } from '@/components/ui';
import { PlusIcon } from 'lucide-react';
export default function CollectionsPage() {
  const { collections, loading, error } = useCollections();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditCollectionOpen, setIsEditCollectionOpen] = useState<Collection | null>(null);
  const [isDeleteCollectionOpen, setIsDeleteCollectionOpen] = useState<Collection | null>(null);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:mt-0 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Collections</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Collection
        </Button>
        {/* Create Collection Modal */}
        <CreateCollectionModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} />
      </div>
      {/* List of Collections */}
      <div className="flex flex-wrap gap-4">
        {collections.map((collection: Collection) => (
          <ContextMenu key={collection.id}>
            <ContextMenuTrigger asChild>
              <Link
                href={`/collections/${collection.id}`}
                key={collection.id}
                className="flex flex-col gap-2 border-b border-gray-200 sm:p-4 p-2 shadow-md rounded-lg sm:h-48 sm:w-48 h-32 w-32 hover:bg-gray-100 transition-all duration-300"
              >
                <h2 className="sm:text-xl text-lg font-medium">{collection.name}</h2>
                <p className="text-sm text-gray-500">{collection.description}</p>
                <p className="text-sm text-gray-500">{collection.collection_recipes.length} recipes</p>
              </Link>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => setIsEditCollectionOpen(collection)}>Edit</ContextMenuItem>
              <ContextMenuItem onClick={() => setIsDeleteCollectionOpen(collection)}>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
      {/* Edit Collection Modal */}
      <EditCollectionModal
        collection={isEditCollectionOpen as Collection}
        setIsEditCollectionOpen={setIsEditCollectionOpen}
      />
      {/* Delete Collection Modal */}
      <DeleteCollectionModal
        isDeleteCollectionOpen={isDeleteCollectionOpen}
        setIsDeleteCollectionOpen={setIsDeleteCollectionOpen}
      />
    </div>
  );
}
