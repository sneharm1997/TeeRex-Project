import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from './product';
import { CartProductsService } from './services/cart-products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  totalCartItems: number;
  constructor(private cartProducts:CartProductsService ){
  }
 
  ngOnInit(): void {
    this.cartProducts.addedProductsAsObs.subscribe((data)=>{
      this.totalCartItems=data.length;
    });
  }
  title = 'teeRex_store';
}
