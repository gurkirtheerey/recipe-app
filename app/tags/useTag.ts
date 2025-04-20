import { createClient } from '@/lib/supabase/client';
import { Tag } from '@/types';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const useTag = (userId: string | null, recipeId?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  /**
   * Get all tags
   */
  const getTags = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.from('tags').select('*');
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      return data;
    },
  });

  /**
   * Get tags for a recipe
   */
  const getTagsForRecipe = useQuery({
    queryKey: ['tags', recipeId],
    queryFn: async () => {
      const supabase = await createClient();
      const { data: allTags, error: allTagsError } = await supabase.from('tags').select('*');
      if (allTagsError) {
        throw new Error(allTagsError.message);
      }
      const { data, error } = await supabase
        .from('recipe_tags')
        .select('tag_id, tags (id, name)')
        .eq('recipe_id', recipeId);
      if (error) {
        throw new Error(error.message);
      }
      return { tags: allTags, recipeTags: data };
    },
    enabled: !!recipeId,
  });

  /**
   * Add tags to a recipe
   */
  const addTagsToRecipe = useMutation({
    mutationFn: async ({ recipeId, selectedTags }: { recipeId: string; selectedTags: Tag[] }) => {
      const supabase = await createClient();
      const { error: deleteError } = await supabase.from('recipe_tags').delete().eq('recipe_id', recipeId);

      // If there is an error deleting the existing tags, throw an error
      if (deleteError) {
        toast.error(deleteError.message);
        throw new Error(deleteError.message);
      }

      // Insert the new tags
      const { data, error: insertError } = await supabase
        .from('recipe_tags')
        .insert(selectedTags.map((tag) => ({ tag_id: tag.id, recipe_id: recipeId })));
      if (insertError) {
        toast.error(insertError.message);
        throw new Error(insertError.message);
      }

      // Successfully added the tags to the recipe
      toast.success('Tags added to recipe');
      router.refresh();
      return data;
    },
  });

  /**
   * Create a tag
   */
  const createTag = useMutation({
    mutationFn: async (name: string) => {
      const supabase = await createClient();
      const { error } = await supabase.from('tags').insert({ name });
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.success('Tag created');
      queryClient.invalidateQueries({ queryKey: ['tags', userId] });
    },
  });

  /**
   * Delete a tag
   */
  const deleteTag = useMutation({
    mutationFn: async (tagId: string) => {
      const supabase = await createClient();
      const { error } = await supabase.from('tags').delete().eq('id', tagId);
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      queryClient.invalidateQueries({ queryKey: ['tags', userId] });
      toast.success('Tag deleted');
    },
  });

  /**
   * Update a tag
   */
  const updateTag = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const supabase = await createClient();
      const { error } = await supabase.from('tags').update({ name }).eq('id', id);
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.success('Tag updated');
      queryClient.invalidateQueries({ queryKey: ['tags', userId] });
    },
  });
  return { addTagsToRecipe, getTags, getTagsForRecipe, deleteTag, createTag, updateTag };
};

export default useTag;
