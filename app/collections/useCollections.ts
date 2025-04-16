import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Collection } from '@/types';
import { useAuth } from '@/hooks/useAuth';

/**
 * Use collections
 * @returns {Object}
 * @throws {Error} if the user is not found
 */
export const useCollections = () => {
  const queryClient = useQueryClient();
  const { user, isLoading: isUserLoading } = useAuth();

  /**
   * Get all collections for the user
   * @returns {Collection[]}
   * @throws {Error} if the user is not found
   */
  const {
    data: collections,
    isLoading: isCollectionsLoading,
    error,
  } = useQuery({
    queryKey: ['collections', user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error('User not found');
      }
      const { data, error } = await fetch('/api/collections').then((res) => res.json());
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!user,
  });

  /**
   * Delete a collection
   * @param {Collection} collection
   * @returns {void}
   * @throws {Error} if the collection is not found
   */
  const handleDeleteCollection = useMutation({
    mutationFn: async (collection: Collection) => {
      const response = await fetch('/api/collections', {
        method: 'DELETE',
        body: JSON.stringify({ id: collection.id }),
      });
      const res = await response.json();
      if (!response.ok) {
        const errorMessage = res.error || 'Failed to delete collection';
        toast.error(typeof errorMessage === 'string' ? errorMessage : 'Error deleting collection');
        throw new Error(typeof errorMessage === 'string' ? errorMessage : 'Error deleting collection');
      }

      queryClient.invalidateQueries({ queryKey: ['collections', user?.id] });
      toast.success('Collection deleted successfully');
    },
  });

  /**
   * Create a collection
   * @param {Object} formData
   * @param {string} formData.name
   * @param {string} formData.description
   * @returns {void}
   * @throws {Error} if the collection is not found
   */
  const handleCreateCollection = useMutation({
    mutationFn: async (formData: { name: string; description: string }) => {
      const { data, error } = await fetch('/api/collections', {
        method: 'POST',
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      queryClient.invalidateQueries({ queryKey: ['collections', user?.id] });
      toast.success('Collection created successfully');
      return data;
    },
  });

  /**
   * Update a collection
   * @param {Collection} collection
   * @param {Object} data
   * @param {string} data.name
   * @param {string} data.description
   * @returns {void}
   * @throws {Error} if the collection is not found
   */
  const handleUpdateCollection = useMutation({
    mutationFn: async ({ id, name, description }: { id: string; name: string; description: string }) => {
      const res = await fetch(`/api/collections/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, description, collection_recipes: undefined }),
      });
      if (!res.ok) {
        toast.error('Failed to update collection');
        throw new Error('Failed to update collection');
      }
      const data2 = await res.json();
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast.success('Collection updated successfully');
      return data2;
    },
  });

  const loading = isCollectionsLoading || isUserLoading;

  return { handleDeleteCollection, handleCreateCollection, handleUpdateCollection, collections, loading, error };
};
