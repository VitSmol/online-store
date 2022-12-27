import { products } from "./data";
import { Goods } from "./goods";
// import { Product } from "./interfaces";

// const product: Product = products[0];
const parent = document.querySelector('.goods-cards');

for (const item of products) {
  const good: Goods = new Goods(parent as HTMLDivElement, item);
  good.createCard();
}