import { getPopup } from "./popup";

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
          console.log('1', isValid);
        }

        if (!(phoneNumber.value as string).match(/\+([0-9]{9,})+/g)) {
          isValid = false;
          console.log('2', isValid);
        }

        if (!(address.value as string).trim().match(/[A-Za-zА-Яа-яЁё]{5,}\s[A-Za-zА-Яа-яЁё]{5,}(\s[A-Za-zА-Яа-яЁё]{5,})+/g)) {
          isValid = false;
          console.log('3', isValid);
        }

        if (!(email.value as string).match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,}$/ig)) {
          isValid = false;
          console.log('4', isValid);
        }

        if (!(cardNumber.value as string).match(/[0-9]{16}/g)) {
          isValid = false;
          console.log('5', isValid);
        }

        if (!(cardExpiryDate.value as string).match(/^(0[1-9]|1[0-2])\/\d{2}$/g)) {
          isValid = false;
        }

        if (!(cardCvv.value as string).match(/[0-9]{3}/g)) {
          isValid = false;
        }

        if(isValid) {
          popup.innerHTML = '<div class="success-message">Заказ успешно оформлен!</div>';
          setInterval(() => console.log('ORDER COMPLETE'), 3000);
        }
      }
    });
  }
};

window.addEventListener('click', showPopup);