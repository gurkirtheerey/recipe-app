'use client';
import { Button, Input, PopoverContent, Popover, PopoverTrigger } from '@/components/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';
import { SendIcon, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { Profile } from '@/types/profileTypes';
import { formatDistanceToNow } from 'date-fns';

type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: Profile;
};

const CommentForm = ({ recipeId, userId }: { recipeId: string; userId: string }) => {
  const [content, setContent] = useState('');
  const supabase = createClient();
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: isLoadingComments,
    error,
  } = useQuery({
    queryKey: ['comments', recipeId],
    queryFn: async () =>
      await supabase
        .from('comments')
        .select(
          `
      *,
      profiles (
        id,
        username,
        profile_picture,
        first_name,
        last_name
      )
    `
        )
        .eq('recipe_id', recipeId)
        .order('created_at', { ascending: false }),
  });

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: async (content: string) => {
      const { data, error } = await supabase.from('comments').insert({ content, recipe_id: recipeId, user_id: userId });
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['comments', recipeId] });
      toast.success('Comment created successfully');
      return data;
    },
  });

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['comments', recipeId] });
      toast.success('Comment deleted successfully');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment(content);
    setContent('');
  };

  const comments = data?.data;

  const isLoading = isDeleting || isCreating;

  if (isLoadingComments) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!comments) return <div>No data</div>;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex items-end  gap-4">
        <Input
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          <SendIcon className="w-4 h-4" />
        </Button>
      </form>
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="flex items-center justify-between w-full gap-2 bg-gray-100 p-2 rounded-md">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-2">
                <Image
                  src={comment.profiles.profile_picture}
                  alt={comment.profiles.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>
                  {comment.profiles.first_name} {comment.profiles.last_name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              {comment.user_id === userId && (
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <EllipsisVertical className="w-4 h-4 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-30">
                      <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <span
                          className="cursor-pointer hover:text-gray-400 transition-all duration-300"
                          onClick={() => deleteComment(comment.id)}
                        >
                          Delete
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            <span className="text-sm text-gray-700">{comment.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentForm;
