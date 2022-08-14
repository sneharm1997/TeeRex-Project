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
    const isPresent = this.addedProducts.some(item => {
      return item.id === product.id;
    })
    if (!isPresent) {
      this.addedProducts.push(product);
      this.addedProductsAsObs.next(this.addedProducts);
    }
    localStorage.setItem("products", JSON.stringify(this.addedProducts));
  }

  incrementQty(product) {
    this.addedProducts.map(item => {
      if (item.id == product.id) {
        if (item.count < product.quantity) {
          item.count++;
          item.price = item.originalPrice * item.count;
        }
      }
    })
    localStorage.setItem("products", JSON.stringify(this.addedProducts));
  }

  decrementQty(product) {
    this.addedProducts.map(item => {
      if (item.id == product.id) {
        if (item.count > 1) {
          item.count--;
          item.price = item.originalPrice * item.count;
        }
      }
    })
    localStorage.setItem("products", JSON.stringify(this.addedProducts));
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
