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

export type minMaxQuery = {
  price?: minMax
  stock?: minMax
}

export interface IProduct {
  showElement(element: Product): void;
  addToCart(element: Product): void;
}

export type query = {
  category?: Array<string | undefined>,
  brand?: Array<string | undefined>,
  // price?: Array<number | undefined>,
  // stock?: Array<number | undefined>,
}