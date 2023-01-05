import { Product, query, SearchBy } from "../interfaces";
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
    public isChecked: boolean,
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
    const inputs = document.querySelectorAll('input.' + this.searchBy);
    if (this.input.checked) {
      inputs.forEach((input) => {
        if (input !== this.input) {
          this.input.classList.remove('notActive');
          (input as HTMLInputElement).classList.add('notActive');
        }
      });
    }
    if (!this.input.checked) {
      inputs.forEach((input) => {
        if (!(input as HTMLInputElement).checked) {
          input.classList.remove('notActive');
        }
      });
    }
  }
  checkGoods() {
    return document.querySelectorAll('.card');
  }
  checkQuery(query: query): boolean {
    return Object.values(query).some((el) => {
      return el.length > 0;
    });
  }
  querySearch() {
    this.getQuery();
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