import { products } from "./data";
import { ProductClass } from "./classes/productClass";
// import { Product } from "./interfaces";

const parent = document.querySelector('.goods-cards');

new ProductClass(parent as HTMLDivElement, products).init(ProductClass.allProducts);