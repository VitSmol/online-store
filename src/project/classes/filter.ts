import { category, SearchBy } from "../interfaces";
import { CheckboxItem } from "./checkboxItem";

export class Filter {
  constructor(
    public items: category,
    public parent: HTMLDivElement,
    public searchBy: SearchBy,
    public isChecked: boolean
  ) {

  }

  create() {
    Object.entries(this.items).forEach((el, index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      new CheckboxItem(
        label,
        input,
        this.parent,
        this.searchBy,
        this.isChecked,
        index,
        el
      );
    });
  }
  log() {
    console.log(this);
  }
}

