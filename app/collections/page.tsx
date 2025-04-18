'use client';
import { useState } from 'react';
import { Collection } from '@/types';
import Loading from './loading';
import Link from 'next/link';
import EditCollectionModal from './components/edit-collection-modal';
import { useCollections } from './useCollections';
import DeleteCollectionModal from './components/delete-collection-modal';
import CreateCollectionModal from './components/create-collection-modal';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui';
import { Button } from '@/components/ui';
import { PlusIcon, EllipsisVertical } from 'lucide-react';

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
        <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">Collections</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Collection
        </Button>
        {/* Create Collection Modal */}
        <CreateCollectionModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} />
      </div>
      {/* List of Collections */}
      <div className="flex sm:flex-row flex-col gap-4">
        {collections.map((collection: Collection) => (
          <ContextMenu key={collection.id}>
            <ContextMenuTrigger asChild>
              <div
                key={collection.id}
                className="flex flex-col justify-between gap-2 border-b border-gray-200 dark:border-gray-700 sm:p-4 p-2 shadow-md rounded-lg sm:h-48 sm:w-48 h-32 w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-auto bg-white dark:bg-gray-800"
              >
                <div className="flex justify-between items-center">
                  <Link href={`/collections/${collection.id}`}>
                    <h2 className="sm:text-xl text-md font-medium transition-all duration-300 hover:text-gray-500 dark:hover:text-gray-300 line-clamp-1 text-gray-900 dark:text-gray-100">
                      {collection.name}
                    </h2>
                  </Link>
                  {/* Popover for Edit and Delete */}
                  <div className="py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                    <Popover>
                      <PopoverTrigger asChild>
                        <EllipsisVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </PopoverTrigger>
                      <PopoverContent className="w-30 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span
                            className="cursor-pointer hover:text-gray-400 dark:hover:text-gray-300 transition-all duration-300"
                            onClick={() => setIsEditCollectionOpen(collection)}
                          >
                            Edit
                          </span>
                          <span
                            className="cursor-pointer hover:text-gray-400 dark:hover:text-gray-300 transition-all duration-300"
                            onClick={() => setIsDeleteCollectionOpen(collection)}
                          >
                            Delete
                          </span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {collection.description}
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {collection.collection_recipes.length} recipes
                  </span>
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <ContextMenuItem
                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsEditCollectionOpen(collection)}
              >
                Edit
              </ContextMenuItem>
              <ContextMenuItem
                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsDeleteCollectionOpen(collection)}
              >
                Delete
              </ContextMenuItem>
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
