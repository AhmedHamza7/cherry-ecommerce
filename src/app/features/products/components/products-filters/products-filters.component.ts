import { Component, inject } from '@angular/core';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-products-filters',
  standalone: true,
  imports: [],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.scss'
})
export class ProductsFiltersComponent {
  readonly store = inject(ProductsStore);

  setCategory(category: string | null): void {
    this.store.setCategory(category);
  }
}
