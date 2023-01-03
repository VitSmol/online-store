import { products } from "./data";
import { ProductClass } from "./classes/productClass";
// import { Product } from "./interfaces";

const parent = document.querySelector('.goods-cards');

new ProductClass(parent as HTMLDivElement, products).init();

// const brands = document.querySelectorAll("input.brand");

// const categoryContainer = document.getElementById('categories');

// categoryContainer?.addEventListener('click', (e) => {
//   const categories = document.querySelectorAll("input.category");
//   // categories.forEach((category) => {
//   //   // if (category.checked)
//   //   // const target = (e.target as HTMLElement);
//   //   // if (category !== e.target ) {
//   //   //   // (category as HTMLInputElement).disabled = true;
//   //   //   console.log(target);
//   //   //   // console.log(e.target?.closest('input'));
      
//   //   // }
//   // });
// });