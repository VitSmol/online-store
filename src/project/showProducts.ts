import { ProductClass } from "./classes/productClass";
import { create } from "./filters";

const parent = document.querySelector('.goods-cards');
const logo = document.querySelector('.logo');
const main = document.querySelector('.main');

new ProductClass(parent as HTMLDivElement).init(ProductClass.allProducts);

logo?.addEventListener('click', () => {
  (main as HTMLDivElement).innerHTML = `
  <div class="filter__wrapper">
  <div id="search">
    <label for="search">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.81999 19.2916C1.06 15.5316 1.06 9.43545 4.81999 5.67546C8.57998 1.91547 14.6761 1.91547 18.4361 5.67546C22.1807 9.42007 22.1961 15.4818 18.4821 19.2453C18.4662 19.2593 18.4507 19.2738 18.4356 19.289C18.4204 19.3042 18.4058 19.3198 18.3917 19.3357C14.6283 23.0515 8.56522 23.0368 4.81999 19.2916ZM19.1144 21.382C14.5458 25.2344 7.70897 25.009 3.40578 20.7058C-1.13526 16.1648 -1.13526 8.80229 3.40578 4.26125C7.94682 -0.279791 15.3093 -0.279791 19.8503 4.26125C24.1528 8.56373 24.3788 15.399 20.5284 19.9676L22.8498 22.289C23.2403 22.6795 23.2403 23.3127 22.8498 23.7032C22.4593 24.0937 21.8261 24.0937 21.4356 23.7032L19.1144 21.382Z" fill="#5A5A5A"/>
        </svg>
      <input placeholder="Search product"  type="text" name="search" id="search__item">
    </label>
  </div>
  <div id="select">
    <select class="form-select" id="sortBy" aria-label="Default select example">
      <option selected>Sort options</option>
      <option value="price-hi">Sort by price ASC</option>
      <option value="price-low">Sort by price DESC</option>
      <option value="rating-hi">Sort by rating ASC</option>
      <option value="rating-low">Sort by rating DESC</option>
      <option value="discount-hi">Sort by discount ASC</option>
      <option value="discount-low">Sort by discount DESC</option>
    </select>
  </div>
  <div id="categories" >

  </div>
  <div id="brands">
    
  </div>
  <div id="prices">
    <div class="center">
      <h2>Price</h2>
      <div class="dual-range" id="price">
        <span class="handle left"></span>
        <span class="highlight"></span>
        <span class="handle right"></span>
      </div>
    </div>
  </div>
  <div id="stocks">
    <div class="center">
      <h2>Stocks</h2>
      <div class="dual-range"  id="stock">
        <span class="handle left"></span>
        <span class="highlight"></span>
        <span class="handle right"></span>
      </div>
    </div>
  </div>
  <div id="reset">
    <button type="button" class="btn btn-warning">Reset</button>
  </div>
  <div id="copy-link">
    <button type="button" class="btn btn-primary">Copy link</button>
  </div>
  <div id="size">
    <button type="button" class="small-size btn btn-warning"></button>
    <button type="button" class="big-size btn btn-warning"></button>
  </div>
</div>
<section class="goods-section">
    <div class="container">
        <h2 id="goods">Товары в наличии</h2>
        <div class="goods-cards">
        </div>
</section>
  `;

  create();
  const parent = document.querySelector('.goods-cards');
  new ProductClass(parent as HTMLDivElement).init(ProductClass.allProducts);
});