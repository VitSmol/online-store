// import { query } from "../interfaces";

import { Product } from "../interfaces";
import { ProductClass } from "./productClass";

// import { CheckboxItem } from "./checkboxItem";
export const setCartToStorage = (element: Product) => {
  if (!localStorage.getItem('cart')) {
    const tempArray = [];
    tempArray.push(element);
    localStorage.setItem('cart', JSON.stringify(tempArray));
    console.log(
      localStorage
    ); 
  } else {
    const tempCartStorage: Product[] = JSON.parse(localStorage.cart);
    const compare = (arr: Product[], el: Product) => {
      return arr.some((item: Product) =>{
        return el.id === item.id;
      });
    };
    if (!compare(tempCartStorage, element)) {
      tempCartStorage.push(element);
      localStorage.setItem('cart', JSON.stringify(tempCartStorage));
    }
    ProductClass.cart = JSON.parse(localStorage.cart);
    console.log(
      JSON.parse(localStorage.cart)
    );
    console.log(
      ProductClass.cart
    );
    
  }
};

export const getCartStorage = () => {
  if (localStorage.getItem('cart')) {
    ProductClass.cart = JSON.parse(localStorage.cart);
  }
};

