export interface Restaurant {
  id: string;
  user_id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  email: string | null;
  created_at: string;
  is_active?: boolean;
  address?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  maps_url?: string | null;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  icon: string;
  position: number;
  visible: boolean;
  created_at: string;
}

export interface Item {
  id: string;
  category_id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available: boolean;
  position: number;
  created_at: string;
}

export interface CategoryWithItems extends Category {
  items: Item[];
}

export interface MenuData {
  restaurant: Restaurant;
  categories: CategoryWithItems[];
}
