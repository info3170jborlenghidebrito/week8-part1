import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './components/services/cart.service';
import { Observable, Observer, Subscription } from 'rxjs';
import { Product } from './components/models/product';
import { CartItem } from './components/models/cart-item';
import { ShoppingCart } from './components/models/shopping-cart';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public cart: Observable<ShoppingCart>;
  public cartItems: CartItem[];
  public itemCount: number;

  private _cartSubscription: Subscription;

  constructor(private _cartService: CartService) {}

  public ngOnInit(): void {
    this.cart = this._cartService.get();
    this._cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items
        .map((x) => x.quantity)
        .reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {}
}
