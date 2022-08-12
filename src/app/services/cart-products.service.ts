import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {
  addedProducts: Product[] = [];
  cartProducts = JSON.parse(localStorage.getItem("products"))
  addedProductsAsObs = new BehaviorSubject(this.cartProducts);
  constructor() { }

  addProducts(product) {
    if (localStorage.getItem("products")) {
      this.addedProducts = JSON.parse(localStorage.getItem("products"));
    }
    this.addedProducts.push(product);
    this.addedProductsAsObs.next(this.addedProducts);
    localStorage.setItem("products", JSON.stringify(this.addedProducts));
  }


  containsObject(obj, listObj) {
    var i;
    for (i = 0; i < listObj.length; i++) {
      if (listObj[i].id === obj.id) {
        return true;
      }
    }

    return false;
  }


  getProducts() {
    if (localStorage.getItem("products")) {
      this.addedProducts = JSON.parse(localStorage.getItem("products"));
    }

    return this.addedProducts;
  }


  deleteItem(n) {
    var items = JSON.parse(localStorage.getItem("products"))
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == n) {
        items.splice(i, 1);
        this.addedProducts.splice(i, 1)
      }
    }
    this.addedProductsAsObs.next(this.addedProducts);
    localStorage.setItem("products", JSON.stringify(items));

  }
}
