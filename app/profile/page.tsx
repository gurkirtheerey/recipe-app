'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

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

  const handleFormSubmit = (data: z.infer<typeof profileSchema>) => onSubmit.mutate(data);

  if (isLoading || isLoadingProfile) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="container mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24"
        data-testid="profile-form"
      >
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-sm text-muted-foreground">
              Update your profile information to keep your account up to date.
            </p>
          </div>
          <Button type="submit" variant="outline" data-testid="submit-button">
            Edit Profile
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Email</h2>
              <Input disabled {...register('email')} data-testid="email-input" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">First Name</h2>
              <Input disabled={onSubmit.isPending} {...register('first_name')} data-testid="first-name-input" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Last Name</h2>
              <Input disabled={onSubmit.isPending} {...register('last_name')} data-testid="last-name-input" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Username</h2>
              <Input disabled={onSubmit.isPending} {...register('username')} data-testid="username-input" />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
