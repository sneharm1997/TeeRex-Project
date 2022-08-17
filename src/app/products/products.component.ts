import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { CartProductsService } from '../services/cart-products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  count: number = 1;
  filteredString = { color: [], gender: [], price: [], type: [] };
  filstring: string;
  searchForm = new FormControl('')
  searchFilterString: string;
  colors = ['Red', 'Blue', 'Green'];
  genders = ['Men', 'Women'];
  types = ['Polo', 'Hoodie', 'Basic'];
  prices = [
    { value: '0 - Rs. 250', level: [0, 250] },
    { value: 'Rs. 251 - Rs. 450', level: [251, 450] },
    { value: 'Rs. 450', level: [451, 1000] }
  ]

  constructor(private http: HttpClient, private cartProducts: CartProductsService) { }

  ngOnInit(): void {

    this.http.get<Product[]>("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json").subscribe((data: Product[]) => {
      this.products = data;
      this.products.forEach((item) => {
        return item.originalPrice = item.price, item.count = 1;
      })
    })
  }

  addToCart(product: Product) {
    this.cartProducts.addProducts(product);
  }

  applyFilter(checked, value, key) {
    if (checked) {
      this.filteredString[key].push(value);
    } else {
      this.filteredString[key] = this.filteredString[key].filter(val => {
        return val.toLowerCase() !== value.toLowerCase();
      })
    }
  }

  searchProducts(value) {
    this.searchFilterString = value;
  }

  enter(event, value) {
    if (event.keyCode === 13) {
      this.searchProducts(value);
    }
  }

}
