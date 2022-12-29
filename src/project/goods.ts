// import { products } from "./data";
import { IProduct, Product } from "./interfaces";

export class Goods implements IProduct {
  static cart: Product[] = [];
  static allProducts: Product[] = [];
  
  constructor(
    public parent: HTMLDivElement,
    public element: Product
  ) {}

  createCard() {
    const card = document.createElement('div');
    card.classList.add('goods-card');
    card.dataset.category = this.element.category;
    card.dataset.brand = this.element.brand.toLowerCase();
    card.dataset.brand = this.element.brand.toLowerCase();
    card.dataset.rating = this.element.rating as unknown as string;
    card.dataset.price = this.element.price as unknown as string;
    card.dataset.stock = this.element.stock as unknown as string;

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    
    const img: HTMLImageElement = document.createElement('img');
    img.alt = this.element.title;
    img.src = this.element.thumbnail;
    // img.style.width = '200px';

    const discount = document.createElement('div');
    discount.classList.add('product-discount');
    discount.innerText = this.element.discountPercentage + '%';
    discount.dataset.value = this.element.discountPercentage as unknown as string;
    cardImage.append(img, discount);

    const info = document.createElement('div');
    info.classList.add('card-info');
    const h3 = document.createElement('h3');
    h3.classList.add('product-name');
    h3.innerHTML = this.element.title;
    
    const brand = document.createElement('div');
    brand.classList.add('product-brand');
    brand.innerText = this.element.brand;
    
    const rating = document.createElement('div');
    rating.classList.add('product-rating');
    rating.innerText = this.element.rating as unknown as string;

    const controls = document.createElement('div');
    controls.classList.add('product-controls');

    const price = document.createElement('div');
    price.classList.add('product-price');
    price.innerText = this.element.price as unknown as string;

    
    const btnMore = document.createElement('button');
    btnMore.classList.add('more-info-button', 'button');
    btnMore.innerText = 'More Info';

    const cartBtn = document.createElement('button');
    cartBtn.classList.add('add-trolley-button', 'button');
    

    controls.append(price, btnMore, cartBtn);
    info.append(h3, brand, rating, controls);
    card.append(cardImage, info);
    this.parent.append(card);

    btnMore.addEventListener('click', this.showElement.bind(this));
    cartBtn.addEventListener('click', this.addToCart.bind(this));
  }

  showElement() {
    console.log(this.element);
  }

  addToCart() {
    Goods.cart.push(this.element);
    console.log(Goods.cart);
  }
}