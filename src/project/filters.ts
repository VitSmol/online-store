import { getCheckboxes, getCost, products } from "./data";
import { SearchBy } from "./interfaces";
import { Slider } from "./classes/slider";
import { Filter } from "./classes/filter";
import { addSelectListeners } from "./showProducts";

export const create = () => {
  const categoryContainer = document.getElementById('categories');
  const brandsContainer = document.getElementById('brands');
  const priceSlider = document.getElementById('price');
  const stockSlider = document.getElementById('stock');
  const categories = getCheckboxes(products, SearchBy.category);
  const brands = getCheckboxes(products, SearchBy.brand);
  const stock = getCost(products, SearchBy.stock);
  const price = getCost(products, SearchBy.price);

  priceSlider?.setAttribute('data-min', price.min as unknown as string);
  priceSlider?.setAttribute('data-max', price.max as unknown as string);
  stockSlider?.setAttribute('data-min', stock.min as unknown as string);
  stockSlider?.setAttribute('data-max', stock.max as unknown as string);

  const createSliders = () => {
    const priceElement = new Slider(priceSlider as HTMLDivElement, price.min, price.max);
    const stockElement = new Slider(stockSlider as HTMLDivElement, stock.min, stock.max);
    Filter.sliderItems.push(priceElement, stockElement);
  };

  createSliders();

  new Filter(categories, categoryContainer as HTMLDivElement, SearchBy.category).create();
  new Filter(brands, brandsContainer as HTMLDivElement, SearchBy.brand).create();

  const createDots = (parent: HTMLElement, count: number): void => {
    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement('span');
      parent.append(dot);
    }
  };

  const buttons = document.querySelectorAll('#size > button');
  buttons.forEach(el =>
    (el.classList.contains('small-size') ?
      createDots(el as HTMLElement, 16) :
      createDots(el as HTMLElement, 36),
    el.addEventListener('click', () => {
      const parent = document.querySelector('.goods-cards');
      el.classList.contains('small-size') ? 
        ((parent as HTMLDivElement).classList.remove('low-size')) :
        ((parent as HTMLDivElement).classList.add('low-size'));
    }))
  );

  addSelectListeners();
};
create();