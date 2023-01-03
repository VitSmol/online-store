import { SearchBy } from "../interfaces";
import { ProductClass } from "./productClass";

export class CheckboxItem {
  static parent2: HTMLDivElement;
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
    this.input.addEventListener('click', this.log.bind(this));
  }
  log() {
    this.hideOtherInputs();

    if (this.input.checked) {
      
      const arr = ProductClass.allProducts.filter((product) => {
        if (typeof product[this.searchBy] === 'string') {
          return (product[this.searchBy] as string).toLowerCase() === this.el[0];
        }
        return product[this.searchBy] === this.el[0];
      });
      ProductClass.tempProducts = [...ProductClass.tempProducts, ...arr];
      ProductClass.tempProducts.sort((a, b) => a.id - b.id);
      ProductClass.tempProducts = [... new Set(ProductClass.tempProducts)];
      CheckboxItem.parent2 = document.querySelector('.goods-cards') as HTMLDivElement;
      // console.log(ProductClass.tempProducts);

      new ProductClass(CheckboxItem.parent2, ProductClass.tempProducts).init();
    }
    if (!this.input.checked) {
      const arr = ProductClass.tempProducts.filter((product) => {
        if (typeof product[this.searchBy] === 'string') {
          return (product[this.searchBy] as string).toLowerCase() !== this.el[0];
        }
        return product[this.searchBy] !== this.el[0];
      });
      CheckboxItem.parent2 = document.querySelector('.goods-cards') as HTMLDivElement;
      ProductClass.tempProducts = [...new Set(arr)];
      new ProductClass(CheckboxItem.parent2, ProductClass.tempProducts).init();
    }
  }
  hideOtherInputs() {
    // console.log(this.input);
    console.log(this.searchBy);

    // if (this.searchBy === 'category') {
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
    // }
  }
}