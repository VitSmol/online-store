import { ProductClass } from "./classes/productClass";

const parent = document.querySelector('.goods-cards');

new ProductClass(parent as HTMLDivElement).init(ProductClass.allProducts);