// import { products } from "./data";
import { products } from "../data";
import { IProduct, Product } from "../interfaces";

export class ProductClass implements IProduct {
  public currentProduct!: Product;
  public card!: HTMLDivElement;
  static _parent: HTMLDivElement;
  static cart: Product[] = [];
  static allProducts: Product[] = [...products];
  static tempProducts: Product[] = [];

  constructor(
    public parent: HTMLDivElement,
    public products: Readonly<Product[]>
  ) {

  }

  init(array: Product[]): void {
    this.parent.innerHTML = '';
    for (const item of array) {
      this.create(item);
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

    btnMore.addEventListener('click', this.showElement.bind(this));
    cartBtn.addEventListener('click', this.addToCart.bind(this));
  }

  // static showHide(element: Product, searchBy: SearchBy): void {
  //TODO this.card = 
  // }
  showElement() {
    // console.log(element);
  }

  addToCart() {
    // ProductClass.cart.push(element);
  }

}