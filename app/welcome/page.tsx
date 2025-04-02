'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function EmailConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      const confirmEmail = async () => {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            router.push('/login?error=confirmation_failed');
          } else {
            // Successful confirmation, redirect to dashboard
            router.push('/dashboard');
          }
        } catch (err) {
          console.error('Unexpected error during email confirmation:', err);
          router.push('/login?error=unexpected');
        }
      };

      confirmEmail();
    } else {
      // No confirmation code present
      router.push('/login?error=no_confirmation_code');
    }
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Confirming your email... Please wait.</p>
    </div>
  );
}
