import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CartProductsService } from '../services/cart-products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Product[];
  total: number = 0;
  constructor(private cartProducts: CartProductsService) { }

  ngOnInit(): void {
    this.items = this.cartProducts.getProducts();
   
    Object.defineProperty(this.items, 'originalPrice', {
      writable: false,
      configurable: false
    });
    this.calculateTotal(this.items);
  }

  deleteProduct(i) {
    this.cartProducts.deleteItem(i);
    this.total = 0;
    this.calculateTotal(this.items);
  }

  calculateTotal(items) {
    this.total=0;
    items.forEach(item => {
      this.total += item.price;
    })
    return this.total;
  }

  inc(item) {
  this.cartProducts.incrementQty(item);
  this.calculateTotal(this.items);
  }

  dec(item) {
    this.cartProducts.decrementQty(item);
    this.calculateTotal(this.items);
  }
}
