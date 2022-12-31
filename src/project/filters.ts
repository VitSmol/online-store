import { getCheckboxes, getCost, products } from "./data";
import { SearchBy } from "./interfaces";
import { Slider } from "./classes/slider";
import { Filter } from "./classes/filter";

const categoryContainer = document.getElementById('categories');
const brandsContainer = document.getElementById('brands');

const categories = getCheckboxes(products, SearchBy.category);
const brands = getCheckboxes(products, SearchBy.brand);
const stock = getCost(products, SearchBy.stock);
const price = getCost(products, SearchBy.price);


const priceSlider = document.getElementById('price');
const stockSlider = document.getElementById('stock');
priceSlider?.setAttribute('data-min', price.min as unknown as string);
priceSlider?.setAttribute('data-max', price.max as unknown as string);
stockSlider?.setAttribute('data-min', stock.min as unknown as string);
stockSlider?.setAttribute('data-max', stock.max as unknown as string);

new Slider(stockSlider as HTMLDivElement, stock.min, stock.max);
new Slider(priceSlider as HTMLDivElement, price.min, price.max);

new Filter(categories, categoryContainer as HTMLDivElement, SearchBy.category, true).create();
new Filter(brands, brandsContainer as HTMLDivElement, SearchBy.brand, false).create();


const createDots = (parent: HTMLElement, count: number): void => {
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('span');
    parent.append(dot);
  }
};
// console.log(stock);
const buttons = document.querySelectorAll('#size > button');
buttons.forEach(el =>
  el.classList.contains('small-size') ? 
    createDots(el as HTMLElement, 16) : 
    createDots(el as HTMLElement, 36)
);


