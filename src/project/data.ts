import dataArray from '../assets/data.json';
import { category, Product } from './interfaces';

// console.log(data.products);
export const products: readonly Product[] = dataArray.products;
// console.log(products);

export const filterArray = (arr: readonly Product[], value: string): category => {
  // const values: Set<string> = new Set();
  // arr.forEach((el) => values.add(el[value as keyof Product] as string));
  // return [...values];
  // if (value === SearchBy.category || value === SearchBy.brand) {
  const obj: category = {};
  arr.forEach((el) => {
    const val = el[value as keyof Product] as string;
    if (!obj[val as keyof category]) {
      obj[val as keyof category] = 1;
    } else {
      obj[val as keyof category]!++;
    }
  });
  return obj;
  // } 
  // else {
  //   if (value === SearchBy.stock || value === SearchBy.price) {
  //     const values: Set<number> = new Set();
  //     arr.forEach((el) => values.add(el[value as keyof Product] as number));
  //     return [...values];
  //   }
  // }
};

// filterArray(products, "brand");

