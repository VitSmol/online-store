import { getPopup } from "./popup";
import { ProductClass } from "./classes/productClass";
import { toMainPage } from "./showProducts";

export const showPopup = (event: Event): void => {
  if ((event.target as HTMLElement).closest('.buy-button')) {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML += getPopup();

    const popupShadow = main.querySelector('.popup-shadow') as HTMLElement;
    const popup = main.querySelector('.popup') as HTMLElement;
    popupShadow.addEventListener('click', (): void => {
      event.stopPropagation();
      main.removeChild(popupShadow);
    });


    popup.addEventListener('input', (event: Event): void => {
      const current = event.target as HTMLInputElement;
      event.stopPropagation();
      current.classList.remove('incorrect');
      const cardLogo = popup.querySelector('.card-logo') as HTMLElement;
      if (current.closest('.card-expiry-date')) {
        current.value = current.value.replace(/([^0-9]|\/)/g, '');
        current.value = current.value.replace(/\d{2}(?=(\d{2})+(?!\d))/g, '$&/');
      }

      if (current.closest('.card-number') || current.closest('.card-cvv')) {
        current.value = current.value.replace(/[^0-9]/g, '');
      }

      if (current.closest('.card-number')) {
        switch (current.value[0]) {
        case '4':
          cardLogo.classList.add('visa');
          break;
        case '5':
          cardLogo.classList.add('mastercard');
          break;
        case '6':
          cardLogo.classList.add('unionpay');
          break;
        default:
          cardLogo.classList.remove('visa', 'mastercard', 'unionpay');
        }
      }

      if (current.closest('.phone-number')) {
        current.value = current.value.replace(/([^\d+])/g, '');
      }
    });

    popup.addEventListener('click', (event: Event): void => {
      event.stopPropagation();

      const current = event.target as HTMLInputElement;
      const name = popup.querySelector('.name') as HTMLInputElement;
      const phoneNumber = popup.querySelector('.phone-number') as HTMLInputElement;
      const address = popup.querySelector('.address') as HTMLInputElement;
      const email = popup.querySelector('.email') as HTMLInputElement;
      const cardNumber = popup.querySelector('.card-number') as HTMLInputElement;
      const cardExpiryDate = popup.querySelector('.card-expiry-date') as HTMLInputElement;
      const cardCvv = popup.querySelector('.card-cvv') as HTMLInputElement;

      if (current.closest('.ordering-button')) {
        let isValid: boolean;
        isValid = true;

        if (!(name.value as string).trim().match(/[A-Za-zА-Яа-яЁё]{3,}(\s[A-Za-zА-Яа-яЁё]{3,})+/g)) {
          isValid = false;
          name.classList.add('incorrect');
          // const err = document.createElement("div") as HTMLElement;
          // err.className = 'error-message';
          // err.textContent = 'ERR';
          // name.after(err);
        }

        if (!(phoneNumber.value as string).match(/\+([0-9]{9,})+/g)) {
          isValid = false;
          phoneNumber.classList.add('incorrect');
        }

        if (!(address.value as string).trim().match(/[A-Za-zА-Яа-яЁё]{5,}\s[A-Za-zА-Яа-яЁё]{5,}(\s[A-Za-zА-Яа-яЁё]{5,})+/g)) {
          isValid = false;
          address.classList.add('incorrect');
        }

        if (!(email.value as string).match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,}$/ig)) {
          isValid = false;
          email.classList.add('incorrect');
        }

        if (!(cardNumber.value as string).match(/[0-9]{16}/g)) {
          isValid = false;
          cardNumber.classList.add('incorrect');
        }

        if (!(cardExpiryDate.value as string).match(/^(0[1-9]|1[0-2])\/\d{2}$/g)) {
          isValid = false;
          cardExpiryDate.classList.add('incorrect');
        }

        if (!(cardCvv.value as string).match(/[0-9]{3}/g)) {
          isValid = false;
          cardCvv.classList.add('incorrect');
        }

        if(isValid) {
          popup.innerHTML = '<div class="success-message">Заказ успешно оформлен!</div>';
          setTimeout(() => {
            ProductClass.cart;
            toMainPage();
          }, 3000);
        }
      }
    });
  }
};

window.addEventListener('click', showPopup);