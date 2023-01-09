import { ProductClass } from "./classes/productClass";
import { Product } from "./interfaces";

export const drawProduct = (product: Product, index: number/*, count: number*/): string => {
  return `<div class="product-card">
            <div class="product-index">${index + 1}</div>
            <div class="product-image">
              <img class="image" src="${product.thumbnail}">
            </div>
            <div class="product-info">
              <div class="title">
                <span class="title-value">${product.title}</span>
              </div>
              <div class="brand">
                <span class="brand-value">${product.brand}</span>
              </div>
              <div class="description">
                <span class="description-value">${product.description}</span>
              </div>
              <div class="discount-percentage">
                Скидка: <span class="discount-percentage-value">${product.discountPercentage}</span>%
              </div>
              <div class="rating">
                Рейтинг: <span class="rating-value">${product.rating}</span>
              </div>
            </div>
            <div class="product-counter">
              <div class="stock">
                На складе: <span class="stock-value">${product.stock}</span>
              </div>
              <div class="counter">
                <button class="plus-button">+</button>
                <div class="goods-quantity">${product.count ?? 1}</div>
                <button class="minus-button">-</button>
              </div>
              <div class="product-total-amount">
                <span class="price-value">${product.price}</span>$
              </div>
            </div>
          </div>`;
};

export const drawProducts = (products: Product[], startIndex: number, endIndex: number): string => {
  let productsPerPage = '';

  for (let i = startIndex; i < endIndex; i++) {
    productsPerPage += drawProduct(products[i], i);
  }

  return productsPerPage;
};

export const getCartPage = (goods: string, count: number): string => {
  return `<section class="cart-section">
  <div class="container">
    <div class="goods-container">
      <div class="card-header">
        <h3 class="subtitle">Товары в корзине:</h3>
        <div>Товаров на странице:
          <input class="on-page-value" type="number" name="on-page-value" value="1">
        </div>
        <div class="pagination">
          Страница:
          <button class="left-button button">&lt;</button>
          <span class="current-page-number">1</span>
          <button class="right-button button">&gt;</button>
        </div>
      </div>
      <div class="goods-in-cart">
      ${goods}
      </div>
    </div>
    <div class="goods-summary">
      <h3 class="subtitle">Текущий счёт</h3>
      <div class="products-count">Товаров в корзине: <span class="count-value">${count}</span></div>
      <div class="products-amount">Текущая сумма: <span class="amount-value">0</span>$</div>
      <input class="discount-field" type="text" placeholder="Введите промокод">
      <button class="buy-button button">Перейти к покупке</button>
    </div>
  </div>
</section>`;
};

export const updateCartCount = () => {
  const cart = document.querySelector('.trolley-goods-count');
  (cart as HTMLElement).innerHTML = ProductClass.cart.length + '';
};

document.addEventListener('click', (event: Event): void => {
  if((event.target as HTMLElement).closest('.product-card')){
    const current = event.target as HTMLElement;
    // const goodsQuantity = currentCard.closest('.goods-quantity') as HTMLElement;
    // console.log(currentCard);

    if(current.closest('.minus-button')) {

      // goodsQuantity.innerHTML = String(+goodsQuantity.innerHTML - 1);
      console.log(current.dataset.id, '-');
    }

    if(current.closest('.plus-button')) {

      // goodsQuantity.innerHTML = String(+goodsQuantity.innerHTML - 1);
      console.log(current.dataset.id);
    }
  }
});