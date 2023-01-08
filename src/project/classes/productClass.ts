// import { products } from "./data";
import { products } from "../data";
import { IProduct, Product } from "../interfaces";
import { getDescriptionPage } from "../description";
import { drawProducts, getCartPage } from "../cart";

export class ProductClass implements IProduct {
  public currentProduct!: Product;
  public card!: HTMLDivElement;
  static _parent: HTMLDivElement;
  static cart: Product[] = [];
  static allProducts: Product[] = [...products];
  static tempProducts: Product[] = [];
  static cardProductsAmount: number;
  static cardProductsCount = 0 as number;

  constructor(
    public parent: HTMLDivElement,
  ) {

  }

  init(array: Product[]): void {
    this.parent.innerHTML = '';
    if (array.length !== 0) {
      this.itemsFound(true);
      for (const item of array) {
        this.create(item);
      }
    } else {
      this.itemsFound(false);
    }
  }
  create(element: Product) {
    this.currentProduct = element;
    this.card = document.createElement('div');
    this.card.classList.add('goods-card');
    this.card.dataset.category = element.category;
    this.card.dataset.brand = element.brand.toLowerCase();
    this.card.dataset.brand = element.brand.toLowerCase();
    this.card.dataset.rating = element.rating as unknown as string;
    this.card.dataset.price = element.price as unknown as string;
    this.card.dataset.stock = element.stock as unknown as string;
    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    const img: HTMLImageElement = document.createElement('img');
    img.alt = element.title;
    img.src = element.thumbnail;
    const discount = document.createElement('div');
    discount.classList.add('product-discount');
    discount.innerText = element.discountPercentage + '%';
    discount.dataset.value = element.discountPercentage as unknown as string;
    cardImage.append(img, discount);
    const info = document.createElement('div');
    info.classList.add('card-info');
    const h3 = document.createElement('h3');
    h3.classList.add('product-name');
    h3.innerHTML = element.title;
    const brand = document.createElement('div');
    brand.classList.add('product-brand');
    brand.innerText = element.brand;
    const rating = document.createElement('div');
    rating.classList.add('product-rating');
    rating.innerText = element.rating as unknown as string;
    const controls = document.createElement('div');
    controls.classList.add('product-controls');
    const price = document.createElement('div');
    price.classList.add('product-price');
    price.innerText = element.price as unknown as string;
    const btnMore = document.createElement('button');
    btnMore.classList.add('more-info-button', 'button');
    btnMore.innerText = 'More Info';
    const cartBtn = document.createElement('button');
    cartBtn.classList.add('add-trolley-button', 'button');
    controls.append(price, btnMore, cartBtn);
    info.append(h3, brand, rating, controls);
    this.card.append(cardImage, info);
    this.parent.append(this.card);
    btnMore.addEventListener('click', this.showElement.bind(this, this.currentProduct));
    cartBtn.addEventListener('click', this.addToCart.bind(this, this.currentProduct));
    const toCartPageBtn = document.querySelector('.trolley-button') as HTMLElement;
    toCartPageBtn.addEventListener('click', this.showCart.bind(this));
  }

  itemsFound(isFound: boolean): void {
    const h2 = document.getElementById('goods');
    isFound ? h2!.innerText = 'Товары в наличии:' : h2!.innerText = 'Товары не найдены!';
  }

  addToCart(element: Product): void {
    ProductClass.cart.push(element);
    ProductClass.cardProductsCount += 1;
    console.log(element);
    console.log(ProductClass.cart);
    console.log(ProductClass.cardProductsCount);
  }
  showElement(element: Product): void {
    console.log(element);
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = getDescriptionPage(element.id);
  }
  showCart(): void {
    const main = document.querySelector('.main') as HTMLElement;
    const goods: string = drawProducts(ProductClass.cart, 0, ProductClass.cart.length);

    main.innerHTML = getCartPage(goods, ProductClass.cardProductsCount);
  }
}
