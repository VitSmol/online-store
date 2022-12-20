export type Product = {
  brand: string;
  category: string;
  id: number;
  title: string;
  description: string
  discountPercentage: number;
  images: string[]
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export type category = {
  category?: number;
  // name?: string;
}

export enum SearchBy {
  category = "category",
  brand = "brand",
  price = "price",
  stock = "stock"
}