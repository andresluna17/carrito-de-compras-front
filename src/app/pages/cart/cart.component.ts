import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService],
})
export class CartComponent implements OnInit {
  displayBasic: boolean;
  productUpdate = {
    product: { nombre: '', sku: '' },
  };
  quantifyUpdate = 0;
  constructor(
    public cartService: CartService,
    private messagerService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  showDialogUpdate(product) {
    this.displayBasic = true;
    this.productUpdate = product;
    this.quantifyUpdate = product.quantity;
    console.log(this.productUpdate);
  }

  async updateProduct() {
    (
      await this.cartService.updateProduct(
        this.productUpdate['id'],
        this.quantifyUpdate
      )
    ).subscribe((res) => {
      console.log(res);
      this.messagerService.add({
        severity: 'success',
        summary: res['message'],
      });
      this.cartService.getCart();
      this.displayBasic = false;
    });
  }

  async deleteProductCart(id: Number) {
    this.confirmationService.confirm({
      message: 'Seguro quieres eliminar este podructo del carrito',
      accept: async () => {
        (await this.cartService.deleteProductCart(id)).subscribe((res) => {
          console.log(res);
          this.cartService.getCart();
          this.messagerService.add({
            severity: 'warn',
            summary: res['message'],
          });
        });
      },
      acceptLabel: 'Aceptar',
      rejectLabel: 'Eliminar',
      header: 'Confirmación',
    });
  }

  async checkoutCart() {
    await (await this.cartService.checkoutCart()).subscribe((res) => {
      console.log(res);
      this.messagerService.add({
        severity: 'success',
        summary: res['message'],
      });
      this.cartService.getCart();
    });
  }
}
