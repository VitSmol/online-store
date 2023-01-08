export const getPopup = (): string => {
  return `<div class="popup-shadow">
  <div class="popup">
    <div class="container">
      <form class="ordering-form">
        <input
        class="name"
        type="text"
        name="name"
        id="name"
        placeholder="Имя Фамилия"
        required>
        <input
        class="phone-number"
        type="tel"
        name="phone-number"
        id="phone-number"
        placeholder="Номер телефона"
        required>
        <input class="address"
        type="text"
        name="address"
        id="address"
        placeholder="Адрес доставки"
        required>
        <input
        class="email"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required>
        <div class="user-card-info">
          <div class="card-logo"></div>
          <input
          class="card-number"
          type="text"
          maxlength="16"
          name="card-number"
          id="card-number"
          placeholder="Номер карты"
          required>
          <input
          class="card-expiry-date"
          type="text"
          maxlength="4"
          name="card-expiry-date"
          id="card-expiry-date"
          placeholder="Срок действия"
          required>
          <input
          class="card-cvv"
          type="text"
          maxlength="3"
          name="card-cvv"
          id="card-cvv"
          placeholder="CVV"
          required>
        </div>
        <input
        class="ordering-button button"
        type="button"
        value="Подтвердить покупку">
      </form>
    </div>
  </div>
</div>`;
};

