'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Oops!</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find the profile you&apos;re looking for. The user might have been deleted or the username
            might be incorrect.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.back()}>Go Back</Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
