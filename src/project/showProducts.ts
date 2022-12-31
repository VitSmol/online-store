import { products } from "./data";
import { ProductClass } from "./classes/productClass";
// import { Product } from "./interfaces";

// const product: Product = products[0];
const parent = document.querySelector('.goods-cards');

new ProductClass(parent as HTMLDivElement, products).init();