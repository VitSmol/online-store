import { filterArray, products } from "./data";
import { category, SearchBy } from "./interfaces";

const categoryContainer = document.getElementById('categories');
const brandsContainer = document.getElementById('brands');

const categories = filterArray(products, SearchBy.category);
const brands = filterArray(products, SearchBy.brand);

const createList = (obj: category, parent: HTMLElement, searchBy: SearchBy): void => {
  Object.entries(obj).forEach((el, index) => {
    const label = document.createElement('label');
    label.setAttribute('for', searchBy + (index + 1));
    label.classList.add('category');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', parent.getAttribute('id') as string);
    input.classList.add('category');
    input.id =  searchBy + (index + 1);
    label.append(input, el[0][0].toUpperCase() + el[0].slice(1).toLowerCase());
    parent.append(label);
  });

};

createList(categories, categoryContainer!, SearchBy.category);
createList(brands, brandsContainer!, SearchBy.brand);
