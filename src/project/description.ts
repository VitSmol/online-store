
import { Product } from "./interfaces";
import { products } from "./data";
// import { loadImage } from "./imagesLoader";

export const getWay = (product: Product): string => {
  return `<div class="way">STORE >> ${product.category} >> ${product.brand} >> ${product.title}</div>`;
};

export const getProductSliderImages = (images: string[]): string => {
  return `<div class="gallery-item">
      <img class="gallery-image" src="${images[0]}" alt="gallery image">
    </div>
    <div class="gallery-item">
      <img class="gallery-image" src="${images[1]}" alt="gallery image">
    </div>`;
  // return images.reduce((acc: string, source: string): string => acc + `<div class="gallery-item">
  //         <img class="gallery-image" src="${source}" alt="gallery image">
  //       </div>`, '');
};

export const getDescription = (product: Product): string => {
  return `<div class="product-full-card">
    <div class="product-gallery">
        <div class="product-images">
          ${getProductSliderImages(product.images)}
        </div>
        <img class="gallery-main-image" src="${product.images[0]}" alt="big picture">
    </div>
    <div class="product-full-info">
        <ul class="product-info-list list">
            <li class="product-item title">
                <span class="title-value">${product.title}</span>
            </li>
            <li class="product-item description">
                Описание: <span class="description-value">${product.description}</span>
            </li>
            <li class="product-item discount-percentage">
                Скидка: <span class="discount-percentage-value">${product.discountPercentage}</span>%
            </li>
            <li class="product-item rating">
                Рейтинг: <span class="rating-value">${product.rating}</span>
            </li>
            <li class="product-item stock">
                На складе: <span class="stock-value">${product.stock}</span> шт.
            </li>
            <li class="product-item brand">
                Марка: <span class="brand-value">${product.brand}</span>
            </li>
            <li class="product-item category">
                Категория: <span class="category-value">${product.category}</span>
            </li>
        </ul>
    </div>
    <div class="product-price-contols">
        <div class="product-price">
            <span class="price-value">${product.price}$</span>
        </div>
        <button class="add-trolley-button button"></button>
        <button class="buy-button button">Перейти к покупке</button>
    </div>
</div>`;
};

export const getDescriptionPage = (id: number): string => {
  return `<section class="description-section">
        <div class="container">
          ${getWay(products[id - 1])}
          ${getDescription(products[id - 1])}
        </div>
    </section>`;
};