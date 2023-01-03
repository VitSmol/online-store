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
    this.input.addEventListener('click', this.showHide.bind(this));
    // this.input.addEventListener('click', this.querySearch.bind(this));
  }

  showHide() {
    this.hideOtherInputs();
    if (this.searchBy === 'category') {
      if (this.input.checked) {
        const arr = ProductClass.allProducts.filter((product) => {
          if (typeof product[this.searchBy] === 'string') {
            return (product[this.searchBy] as string).toLowerCase() === this.el[0];
          }
          return product[this.searchBy] === this.el[0];
        });
        ProductClass.tempProducts = [...ProductClass.tempProducts, ...arr];
        console.log(ProductClass.tempProducts);

        ProductClass.tempProducts.sort((a, b) => a.id - b.id);
        ProductClass.tempProducts = [... new Set(ProductClass.tempProducts)];
        ProductClass._parent = document.querySelector('.goods-cards') as HTMLDivElement;
        new ProductClass(ProductClass._parent, ProductClass.tempProducts).init(ProductClass.tempProducts);
      }
      if (!this.input.checked) {
        const arr = ProductClass.tempProducts.filter((product) => {
          if (typeof product[this.searchBy] === 'string') {
            return (product[this.searchBy] as string).toLowerCase() !== this.el[0];
          }
          return product[this.searchBy] !== this.el[0];
        });
        ProductClass._parent = document.querySelector('.goods-cards') as HTMLDivElement;
        ProductClass.tempProducts = [...new Set(arr)];
        if (ProductClass.tempProducts.length === 0) {
          new ProductClass(ProductClass._parent, ProductClass.allProducts).init(ProductClass.allProducts);
        } else {
          new ProductClass(ProductClass._parent, ProductClass.tempProducts).init(ProductClass.tempProducts);
        }
      }

    }
    if (this.searchBy === 'brand') {
      // console.log(this.searchBy);
      if (this.input.checked) {
        ProductClass._parent = document.querySelector('.goods-cards') as HTMLDivElement;
        const arr = ProductClass.tempProducts.filter((product) => {
          if (typeof product[this.searchBy] === 'string') {
            return (product[this.searchBy] as string).toLowerCase() === this.el[0].toLowerCase();
          }
        });
        new ProductClass(ProductClass._parent, arr).init(arr);
        console.log(!!this.checkGoods().length);
      }
      if (!this.input.checked) {
        ProductClass._parent = document.querySelector('.goods-cards') as HTMLDivElement;
        const arr = ProductClass.tempProducts.filter((product) => {
          if (typeof product[this.searchBy] === 'string') {
            return (product[this.searchBy] as string).toLowerCase() !== this.el[0];
          }
          return product[this.searchBy] !== this.el[0];
        });
        new ProductClass(ProductClass._parent, arr).init([... new Set([...ProductClass.tempProducts, ...arr])]);
        console.log(arr);
      }
    }
  }
  //! not yet used method
  querySearch() {
    const value = this.input.dataset.value;
    ProductClass._parent = document.querySelector('.goods-cards') as HTMLDivElement;
    if (this.input.checked) {
      CheckboxItem.query[this.searchBy as keyof query]?.push(value);
    }
    if (!this.input.checked) {
      if (CheckboxItem.query[this.searchBy as keyof query]?.length !== 0) {
        CheckboxItem.query[this.searchBy as keyof query] = CheckboxItem.query[this.searchBy as keyof query]?.filter((el) => el !== value);
      }
    }

    const filtered = (query: query, arr: Product[]): Product[] => {
      const result: Product[] = [];
      for (const [keys, values] of Object.entries(query)) {
        values.forEach((val) => {
          // ProductClass.allProducts
          arr.forEach((el) => {
            (el[keys as keyof Product] as string).toLowerCase() === val?.toLowerCase() ? result.push(el) : null;
          });
        });
      }
      return [...new Set(result)].sort((a, b) => a.id - b.id);
    };

    const result = filtered(CheckboxItem.query, ProductClass.allProducts);
    if (result.length !== 0 && !CheckboxItem.isChecked) {
      new ProductClass(ProductClass._parent, result).init(result);
    } else {
      new ProductClass(ProductClass._parent, ProductClass.allProducts).init(ProductClass.allProducts);
    }
    if (this.searchBy === 'brand' && result.length !== 0) {
      console.log(` this `);
      const arr = filtered(CheckboxItem.query, result);
      console.log(CheckboxItem.query);
      
      console.log(
        arr
      );

      new ProductClass(ProductClass._parent, filtered(CheckboxItem.query, result)).init(result);
    }
  }
  //! not yet used method
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
}