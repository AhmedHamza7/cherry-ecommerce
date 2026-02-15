import { Component, inject } from '@angular/core';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  readonly store = inject(ProductsStore);

  selectProduct(id: number): void {
    this.store.selectProduct(id);
  }
}
