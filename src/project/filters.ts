import { getCheckboxes, getCost, products } from "./data";
import { category, SearchBy } from "./interfaces";
import { Slider } from "./slider";

const categoryContainer = document.getElementById('categories');
const brandsContainer = document.getElementById('brands');

const categories = getCheckboxes(products, SearchBy.category);
const brands = getCheckboxes(products, SearchBy.brand);
const stock = getCost(products, SearchBy.stock);
const price = getCost(products, SearchBy.price);

const createList = (items: category, parent: HTMLElement, searchBy: SearchBy): void => {
  Object.entries(items).forEach((el, index) => {
    const label = document.createElement('label');
    label.setAttribute('for', searchBy + (index + 1));
    label.classList.add('category');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', parent.getAttribute('id') as string);
    input.classList.add('category');
    input.id = searchBy + (index + 1);
    label.append(input, el[0][0].toUpperCase() + el[0].slice(1).toLowerCase());
    parent.append(label);
  });
};

const priceSlider = document.getElementById('price');
const stockSlider = document.getElementById('stock');
priceSlider?.setAttribute('data-min', price.min as unknown as string);
priceSlider?.setAttribute('data-max', price.max as unknown as string);
stockSlider?.setAttribute('data-min', stock.min as unknown as string);
stockSlider?.setAttribute('data-max', stock.max as unknown as string);

new Slider(stockSlider as HTMLDivElement, stock.min, stock.max);
new Slider(priceSlider as HTMLDivElement, price.min, price.max);

createList(categories, categoryContainer as HTMLElement, SearchBy.category);
createList(brands, brandsContainer as HTMLElement, SearchBy.brand);

console.log(stock);

