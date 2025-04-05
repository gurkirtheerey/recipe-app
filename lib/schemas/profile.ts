import { z } from 'zod';

export const profileSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  profile_picture: z.string().optional(),
});
