import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/products/${id}`);
  }
}
