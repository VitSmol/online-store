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
}

export enum SearchBy {
  category = "category",
  brand = "brand",
  price = "price",
  stock = "stock"
}

export type eventType = {
  clientX: number
}

export type minMax = {
  min: number;
  max: number;
}

export interface IProduct {
  showElement(): void;
  addToCart(element: Product): void;
}

export type query = {
  category?: Array<string | undefined>,
  brand?: Array<string | undefined>,
}