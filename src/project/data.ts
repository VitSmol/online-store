import dataArray from '../assets/data.json';
import { category, minMax, Product } from './interfaces';

export const products: readonly Product[] = dataArray.products;

export const getCheckboxes = (arr: readonly Product[], value: string): category => {
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
};

export const getCost = (arr: readonly Product[], value: string): minMax => {
  const values: Set<number> = new Set();
  arr.forEach((el) => values.add(el[value as keyof Product] as number));
  return {
    min: Math.min.apply(null, [...values]),
    max:  Math.max.apply(null, [...values])
  };
  
};


