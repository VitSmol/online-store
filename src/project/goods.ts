// import { products } from "./data";
import { Product } from "./interfaces";


// const product: Product = products[0];

// console.log(product);

export class Goods {

  constructor(
    public parent: HTMLDivElement,
    public element: Product
  ) {}

  createCard() {
    const card = document.createElement('div');
    card.classList.add('goods-card');
    card.dataset.value = this.element.category;

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

    // const name = document.createElement('div');
    // name.classList.add('product-name');
    // name.innerText = this.element.title;
    // name.dataset.value = this.element.title;
    
    const brand = document.createElement('div');
    brand.classList.add('product-brand');
    brand.innerText = this.element.brand;
    brand.dataset.value = this.element.brand;
    
    const rating = document.createElement('div');
    rating.classList.add('product-rating');
    rating.innerText = this.element.rating as unknown as string;
    rating.dataset.value = this.element.rating as unknown as string;

    const controls = document.createElement('div');
    controls.classList.add('product-controls');

    const price = document.createElement('div');
    price.classList.add('product-price');
    price.innerText = this.element.price as unknown as string;
    price.dataset.value = this.element.price as unknown as string;
    
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
  }

  showElement() {
    console.log(this.element);
  }
}