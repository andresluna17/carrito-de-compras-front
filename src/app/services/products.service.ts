import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = [];
  constructor(private http: HttpClient) {
    this.getProducts();
  }

  async getProducts() {
    await this.http
      .get(
        'https://laravel-carrito-de-compras.herokuapp.com/api/carrito-de-compras/v1/products'
      )
      .subscribe((products) => {
        this.products = products['data'];
        console.log(products);
      });
  }
}
