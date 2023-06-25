export interface IServiceDefault {
  id?: number;
  first_name?: string;
  last_name?: string;
  address?: string;
  created_at?: Date|string;
  updated_at?: Date|string;
  phone?: string;
  city?: string;
  country?: string;
  role?: string;
  active?: boolean;
  verified?: boolean;
  user_media_id?: number;
  nin?: number;
  postal_code?: string;
}