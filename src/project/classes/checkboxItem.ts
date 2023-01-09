import { getCost } from "../data";
import { minMaxQuery, Product, query, SearchBy, sortBy } from "../interfaces";
import { Filter } from "./filter";
import { ProductClass } from "./productClass";
import { getQueryFromStorage, setQueryToStorage } from "./storage";
// import { setStorage } from "./storage";

export class CheckboxItem {
  static goodsParent: HTMLDivElement;
  static query: query = {
    category: [],
    brand: []
  };
  static minMaxQuery: minMaxQuery = {
    price: {
      min: 0,
      max: 0
    },
    stock: {
      min: 0,
      max: 0
    }
  };
  static sortQuery: sortBy = {
    sortBy: []
  };

  constructor(
    public label: HTMLLabelElement,
    public input: HTMLInputElement,
    public parent: HTMLDivElement,
    public searchBy: SearchBy,
    public index: number,
    public el: [string, number]
  ) {
    this.label.setAttribute('for', this.searchBy + (this.index + 1));
    this.label.classList.add(this.searchBy);
    this.input.setAttribute('type', 'checkbox');
    this.input.setAttribute('name', this.searchBy);
    this.input.dataset.value = this.el[0].toLowerCase();
    this.input.classList.add(this.searchBy);
    this.input.id = this.searchBy + (this.index + 1);
    this.label.append(this.input, this.el[0][0].toUpperCase() + this.el[0].slice(1).toLowerCase());
    this.parent.append(this.label);
    this.input.addEventListener('click', this.querySearch.bind(this));
    const count = document.getElementById('count');
    (count as HTMLElement).innerHTML = ProductClass.allProducts.length + '';

    getQueryFromStorage();
    // this.querySearch();
  }

  hideOtherInputs() {
    const allQuery: query = {};
    function inputsQuery(this: query, product: Product): void {
      const currentCategory = this.category;
      const currentBrand = this.brand;
      if (currentCategory?.includes(product.category)) {
        if (!allQuery.category) {
          allQuery.category = [product.category];
        } else {
          allQuery.category.push(product.category);
        }
        if (!allQuery.brand) {
          allQuery.brand = [product.brand.toLowerCase()];
        } else {
          allQuery.brand.push(product.brand.toLowerCase());
        }
      }
      if (currentBrand?.includes(product.brand.toLowerCase())) {
        if (!allQuery.brand) {
          allQuery.brand = [product.brand.toLowerCase()];
        } else {
          allQuery.brand.push(product.brand.toLowerCase());
        }
        if (!allQuery.category) {
          allQuery.category = [product.category];
        } else {
          allQuery.category.push(product.category);
        }
      }
    }

    ProductClass.allProducts.forEach(inputsQuery, CheckboxItem.query);
    for (const [key, value] of Object.entries(allQuery)) {
      allQuery[key as keyof query] = [...new Set(value)];
    }
    function filterInputs(this: query, value: CheckboxItem) {
      value.input.classList.add('notActive');

      if (!this.brand && !this.category) {
        value.input.classList.remove('notActive');
        return;
      }
      if (this.brand!.includes(value.input.dataset.value) || this.category!.includes(value.input.dataset.value)) {
        value.input.classList.remove('notActive');
      }
    }
    Filter.checkboxItems.forEach(filterInputs, allQuery);
  }

  checkGoods() {
    return document.querySelectorAll('.card');
  }

  //! Проверяет запрос. Если все значения пусты - значит запрос пустой.
  checkQuery(query: query): boolean {
    return Object.values(query).some((el) => {
      return el.length > 0;
    });
  }

  querySearch() {
    this.getQuery();
    this.hideOtherInputs();

    function filteredArray(this: query, value: Product) {
      if (this.brand!.length && this.category!.length) {
        return this.brand!.includes(value.brand.toLowerCase()) && this.category!.includes(value.category);
      }
      if (this.category!.length) {
        return this.category!.includes(value.category);
      }
      if (this.brand!.length) {
        return this.brand!.includes(value.brand.toLowerCase());
      }
    }
    const count = document.getElementById('count');
    ProductClass.tempProducts = ProductClass.allProducts.filter(filteredArray, CheckboxItem.query as query);
    ProductClass._parent = document.querySelector('.goods-cards') as HTMLDivElement;

    if (ProductClass.tempProducts.length === 0 && this.checkQuery(CheckboxItem.query)) {
      new ProductClass(ProductClass._parent).init(ProductClass.tempProducts);
      (count as HTMLElement).innerHTML = ProductClass.tempProducts.length + '';
      
    } else if (ProductClass.tempProducts.length === 0 && !this.checkQuery(CheckboxItem.query)) {
      new ProductClass(ProductClass._parent).init(ProductClass.allProducts);
      (count as HTMLElement).innerHTML = ProductClass.allProducts.length + '';
    } else if (ProductClass.tempProducts.length && this.checkQuery(CheckboxItem.query)) {
      new ProductClass(ProductClass._parent).init(ProductClass.tempProducts);
      (count as HTMLElement).innerHTML = ProductClass.tempProducts.length + '';
    }
    if (ProductClass.tempProducts.length !== 0) {
      const getPrice = getCost(ProductClass.tempProducts, SearchBy.price);
      const getStock = getCost(ProductClass.tempProducts, SearchBy.stock);
      Filter.sliderItems[0].setValue(getPrice);
      Filter.sliderItems[1].setValue(getStock);
    } 
    // setStorage(CheckboxItem.query);
    setQueryToStorage(this.searchBy);
  }
  getQuery() {
    const value = this.input.dataset.value;
    this.input.checked ?
      CheckboxItem.query[this.searchBy as keyof query]?.push(value) :
      CheckboxItem.query[this.searchBy as keyof query] = CheckboxItem.query[this.searchBy as keyof query]?.filter((el) => el !== value);
  }
}