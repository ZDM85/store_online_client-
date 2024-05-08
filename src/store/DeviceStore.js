import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._showBrand = "none";
    this._showType = "none";
    this._popupType = "none";
    this._popupBrand = "none";
    this._popupDevice = "none";
    this._showDevice = "none";
    this._popupDeleteType = "none";
    this._popupDeleteBrand = "none";
    this._popupDeleteDevice = "none";
    this._selectedType = {};
    this._selectedBrand = {};
    this._selectedDevice = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 4;
    makeAutoObservable(this);
  }

  setPage(page) {
    this._page = page;
  }
  setLimit(limit) {
    this._limit = limit;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setTypes(type) {
    this._types = type;
  }
  setShowType(str) {
    this._showType = str;
  }
  setShowDevice(str) {
    this._showDevice = str;
  }
  setShowBrand(str) {
    this._showBrand = str;
  }
  setBrands(brand) {
    this._brands = brand;
  }
  setDevices(device) {
    this._devices = device;
  }
  setPopupDeleteType(str) {
    this._popupDeleteType = str;
  }
  setPopupDeleteBrand(str) {
    this._popupDeleteBrand = str;
  }
  setPopupDeleteDevice(str) {
    this._popupDeleteDevice = str;
  }
  setPopupType(str) {
    this._popupType = str;
  }
  setPopupBrand(str) {
    this._popupBrand = str;
  }
  setPopupDevice(str) {
    this._popupDevice = str;
  }
  setSelectedType(type) {
    this._selectedType = type;
    this.setPage(1);
  }
  setSelectedDevice(device) {
    this._selectedDevice = device;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
    this.setPage(1);
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
  get showBrand() {
    return this._showBrand;
  }
  get showDevice() {
    return this._showDevice;
  }
  get showType() {
    return this._showType;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get popupType() {
    return this._popupType;
  }
  get popupDeleteType() {
    return this._popupDeleteType;
  }
  get popupDeleteBrand() {
    return this._popupDeleteBrand;
  }
  get popupDeleteDevice() {
    return this._popupDeleteDevice;
  }
  get popupBrand() {
    return this._popupBrand;
  }
  get popupDevice() {
    return this._popupDevice;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedDevice() {
    return this._selectedDevice;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}
