export type Language = 'ar' | 'en';

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'perfumes' | 'oud' | 'oils' | 'cosmetics';
  concentrationAr: string;
  concentrationEn: string;
  topNotesAr: string;
  topNotesEn: string;
  heartNotesAr: string;
  heartNotesEn: string;
  baseNotesAr: string;
  baseNotesEn: string;
  longevity: number; // 0 to 100
  projection: number; // 0 to 100
  image: string;
  tier: 'top' | 'heart' | 'base';
}

export interface CartItem {
  product: Product;
  quantity: number;
}
