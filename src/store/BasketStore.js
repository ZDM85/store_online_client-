import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._info = [];
    this._selectedBasket = [];
    makeAutoObservable(this);
  }

  setInfo(info) {
    this._info = info;
  }
  setSelectedBasket(basket) {
    this._selectedBasket = basket;
  }

  get info() {
    return this._info;
  }
  get selectedBasket() {
    return this._selectedBasket;
  }
}
