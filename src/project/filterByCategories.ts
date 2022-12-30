
//! simple not implementation

import { products } from "./data";
import { Product } from "./interfaces";

const allGoods = document.querySelectorAll('.goods-card');
const categories = document.querySelectorAll("input.category");
const brands = document.querySelectorAll("input.brand");

const filtered = (key: string, value: string, checked: boolean) => {
  const goods = document.querySelectorAll('.goods-card');
  goods.forEach((el) => {
    const val = value.toLocaleLowerCase();
    const attrName = el.getAttribute('data-' + key);
    const isHideClass = el.classList.contains('hide');
    const isShowClass = el.classList.contains('show');
    if (checked) {
      if (attrName !== val && !isShowClass) {
        el.classList.add('hide');
      }
      if (attrName === val) {
        el.classList.add('show');
        el.classList.remove('hide');
    
      }
      if (!isShowClass && isHideClass && attrName === val) {
        el.classList.remove('hide');
        el.classList.add('show');
      }
    }
    if (!checked) {
      //
    }
  });
};

const clickBy = (...groupe: NodeListOf<Element>[]) => {
  groupe.forEach((el) => {
    el.forEach((input) => {
      input.addEventListener('click', function (this: HTMLInputElement) {
        filtered(this.name, this.nextSibling?.textContent as string, this.checked);
      });
    });
  });
};

clickBy(brands, categories);