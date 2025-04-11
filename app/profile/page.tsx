'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import Loading from './loading';
import { useMetadata } from '@/hooks/useMetadata';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  profile_picture: z.string().optional(),
});

const fetchProfile = async (userId: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('profiles').select('*').eq('id', userId);
  if (!data) {
    throw new Error('Profile not found');
  }
  return data[0];
};

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
  const { updateMetadata } = useMetadata();

  const {
    data,
    isLoading: isLoadingProfile,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(user?.id || ''),
    enabled: !!user?.id,
  });

  const { register, handleSubmit, reset } = form;

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

  if (isLoading || isLoadingProfile) {
    return <Loading />;
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
            <Avatar className="h-20 w-20">
              {/* ----------------------------------- DUMMY IMAGE FOR NOW ----------------------------------- */}
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{userFullName.charAt(0)}</AvatarFallback>
            </Avatar>
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
