// import { query } from "../interfaces";
// import { CheckboxItem } from "./checkboxItem";

// export const setStorage = (query: query) => {
//   localStorage.category = JSON.stringify(query.category);
//   localStorage.brand = JSON.stringify(query.brand);
// };
// console.log(localStorage);

// export const getStorage = (value: string): string[] => {
//   return JSON.parse(localStorage[value]);
// };

// if (localStorage.length === 0) {
//   CheckboxItem.query.category = [];
//   CheckboxItem.query.brand = [];
// } else {
// CheckboxItem.query.category = [... new Set(getStorage('category'))];
// CheckboxItem.query.brand = [... new Set(getStorage('brand'))];
// }