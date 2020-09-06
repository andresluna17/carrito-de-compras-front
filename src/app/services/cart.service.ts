import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  id: number;
  productsCart = [];
  constructor(private http: HttpClient) {
    this.getCart();
  }

  async getCart() {
    await this.http
      .get(
        'https://laravel-carrito-de-compras.herokuapp.com/api/carrito-de-compras/v1/cart'
      )
      .subscribe((cart) => {
        console.log(cart);
        this.id = cart['data']['id'];
        this.productsCart = cart['data']['products_cart'];
      });
  }

  async addCart(id: Number, quantity?: Number) {
    let data = {
      product_id: id,
      cart_id: this.id,
      quantity: quantity == null ? 1 : quantity,
    };

    return await this.http.post(
      'https://laravel-carrito-de-compras.herokuapp.com/api/carrito-de-compras/v1/add-product-cart',
      data
    );
  }

  async updateProduct(id: Number, quantity: Number) {
    let data = {
      quantity: quantity ? quantity : 1,
    };

    return await this.http.patch(
      `https://laravel-carrito-de-compras.herokuapp.com/api/carrito-de-compras/v1/product-cart/${id}`,
      data
    );
  }

  async deleteProductCart(id: Number) {
    return await this.http.delete(
      `https://laravel-carrito-de-compras.herokuapp.com/api/carrito-de-compras/v1/product-cart/${id}`
    );
  }

  async checkoutCart() {
    return await this.http.put(
      `https://laravel-carrito-de-compras.herokuapp.com/api/carrito-de-compras/v1/checkout/${this.id}`,
      {}
    );
  }
}
