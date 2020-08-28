import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService],
})
export class ProductsComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  async addCart(id: Number) {
    (await this.cartService.addCart(id)).subscribe((cart) => {
      console.log(cart);
      this.cartService.getCart();
      this.messageService.add({
        severity: 'success',
        summary: cart['data']['message'],
        detail: cart['status'],
      });
    });
  }
}
