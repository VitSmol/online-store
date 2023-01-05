import { Product, query, SearchBy } from "../interfaces";
import { Filter } from "./filter";
import { ProductClass } from "./productClass";

export class CheckboxItem {
  static isChecked = false;
  static goodsParent: HTMLDivElement;
  static query: query = {
    category: [],
    brand: [],
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
    // this.input.addEventListener('click', this.showHide.bind(this));
    this.input.addEventListener('click', this.querySearch.bind(this));
    // this.input.addEventListener('click', this.querySearch2.bind(this));
  }

  hideOtherInputs() {
    // const value = this.input.dataset.value;
    const checkQuery = this.checkQuery(CheckboxItem.query);

    // function getCompare (array: Product[], query: query)  {
    //   array.forEach((product: Product) => {
    //     console.log(this);

    //   }, query);
    // }
    const allQuery: query = {};
    function inputsQuery(this: query, product: Product): void {
      const currentCategory = this.category;
      const currentBrand = this.brand;
      if (currentCategory?.includes(product.category)) {
        console.log('in this');
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

    ProductClass.tempProducts = ProductClass.allProducts.filter(filteredArray, CheckboxItem.query as query);
    ProductClass._parent = document.querySelector('.goods-cards') as HTMLDivElement;

    if (ProductClass.tempProducts.length === 0 && this.checkQuery(CheckboxItem.query)) {
      new ProductClass(ProductClass._parent).init(ProductClass.tempProducts);
    } else if (ProductClass.tempProducts.length === 0 && !this.checkQuery(CheckboxItem.query)) {
      new ProductClass(ProductClass._parent).init(ProductClass.allProducts);
    } else if (ProductClass.tempProducts.length && this.checkQuery(CheckboxItem.query)) {
      new ProductClass(ProductClass._parent).init(ProductClass.tempProducts);
    }
  }
  getQuery() {
    const value = this.input.dataset.value;
    this.input.checked ?
      CheckboxItem.query[this.searchBy as keyof query]?.push(value) :
      CheckboxItem.query[this.searchBy as keyof query] = CheckboxItem.query[this.searchBy as keyof query]?.filter((el) => el !== value);
  }
}