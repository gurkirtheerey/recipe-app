'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useMetadata } from '@/hooks/useMetadata';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { handleUpload } from '@/lib/utils/fileUpload';
import { redirect } from 'next/navigation';
const profileSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  profile_picture: z.string().optional(),
});

const updateProfile = async (userId: string, formData: z.infer<typeof profileSchema>) => {
  const supabase = createClient();
  const { error } = await supabase.from('profiles').update(formData).eq('id', userId);
  if (error) {
    console.error('Error updating profile:', error);
    toast.error('Error updating profile', {
      description: error.message,
    });
    throw error;
  }
  toast.success('Profile updated successfully');
  return true;
};

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      profile_picture: '',
    },
  });

  const { user, isLoading } = useAuth();

  const { updateMetadata } = useMetadata(user);

  const {
    data,
    isLoading: isLoadingProfile,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!user) {
        throw new Error('User not authenticated');
      }
      const supabase = createClient();
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id);
      if (!data) {
        throw new Error('Profile not found');
      }
      return data[0];
    },
    enabled: !!user,
  });

  const { register, handleSubmit, reset, setValue } = form;

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = useMutation({
    mutationFn: (data: z.infer<typeof profileSchema>) => {
      if (!user) {
        throw new Error('User not authenticated');
      }
      return updateProfile(user.id, data);
    },
  });

  const handleFormSubmit = (data: z.infer<typeof profileSchema>) => {
    onSubmit.mutate(data);
    updateMetadata({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
    });
    setIsEditing(false);
  };

  /**
   * Handles the profile picture upload.
   * Updates the profile picture in the database and the query cache.
   * Invalidates the sidebar profile picture query.
   * Sets the profile picture in the form.
   */
  const handleProfilePictureUpload = useMutation({
    mutationFn: async (file: File) => {
      if (!user) {
        throw new Error('User not authenticated');
      }
      const imageUrl = await handleUpload(file);
      await supabase.from('profiles').update({ profile_picture: imageUrl }).eq('id', user.id);
      toast.success('Profile picture updated successfully');
      setValue('profile_picture', imageUrl);
      queryClient.invalidateQueries({ queryKey: ['sidebar-profile-picture', user.id] });
      return imageUrl;
    },
  });

  /**
   * Handles the file change event for the profile picture upload.
   * Mutates the profile picture upload.
   */
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProfilePictureUpload.mutate(file);
    }
  };

  if (isLoading || isLoadingProfile) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userFullName = `${user?.user_metadata.first_name} ${user?.user_metadata.last_name}`;

  return (
    <main className="min-h-screen bg-background">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="container mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24"
        data-testid="profile-form"
      >
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <label htmlFor="profile-picture-upload" className="cursor-pointer">
              <Avatar className="h-20 w-20">
                {/* ----------------------------------- DUMMY IMAGE FOR NOW ----------------------------------- */}
                <AvatarImage src={form.watch('profile_picture')} />
                <AvatarFallback>{userFullName.charAt(0)}</AvatarFallback>
              </Avatar>
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
              disabled={onSubmit.isPending || !isEditing}
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{userFullName}</h1>
              <p className="text-sm text-muted-foreground">
                Update your profile information to keep your account up to date.
              </p>
            </div>
          </div>

          {isEditing ? (
            <Button type="submit" variant="outline" data-testid="submit-button">
              Save
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Email</h2>
              <Input disabled {...register('email')} data-testid="email-input" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">First Name</h2>
              <Input
                disabled={onSubmit.isPending || !isEditing}
                {...register('first_name')}
                data-testid="first-name-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Last Name</h2>
              <Input
                disabled={onSubmit.isPending || !isEditing}
                {...register('last_name')}
                data-testid="last-name-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Username</h2>
              <Input
                disabled={onSubmit.isPending || !isEditing}
                {...register('username')}
                data-testid="username-input"
              />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
