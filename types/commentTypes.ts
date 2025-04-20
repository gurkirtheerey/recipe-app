import { Profile } from './';

export type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: Profile;
};
