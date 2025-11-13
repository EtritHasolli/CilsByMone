export type Service = {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  category: string | null;
  highlighted: boolean;
};

