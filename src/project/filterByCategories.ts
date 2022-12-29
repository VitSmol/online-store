
import { products } from "./data";
import { Product } from "./interfaces";

const allGoods = document.querySelectorAll('.goods-card');
const categories = document.querySelectorAll("input.category");
const brands = document.querySelectorAll("input.brand");

const filtered = (key: string, value: string, isShow: boolean) => {
  const goods = document.querySelectorAll('.goods-card');
  // const showedGoods = goods.filter(el => {
  //   return el.classList.contain('hide')
  // });
  goods.forEach((el) => {

    if (isShow && el.getAttribute('data-' + key) !== value.toLocaleLowerCase()) {
      el.classList.add('hide');
      if ( el.getAttribute('data-' + key) !== value.toLocaleLowerCase()) {
        el.classList.remove('hide');
      }
      // && 
    } else {
      el.classList.remove('hide');
    }
  });
  // console.log(key, value);

};

const clickBy = (...groupe: NodeListOf<Element>[]) => {
  groupe.forEach((el) => {
    el.forEach((input) => {
      input.addEventListener('click', function (this: HTMLInputElement) {
        // if (this.checked) {
        filtered(this.name, this.nextSibling?.textContent as string, this.checked);
        // console.log('checked');

        // console.dir();
        // }
        // if (!this.checked) {
        //   console.log('not checked');

        // }
      });
    });
  });
};

clickBy(brands, categories);
// hide('category', 'smartphones');