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

  onPriceChange(min: string, max: string): void {
    const parsedMin = min ? Number(min) : null;
    const parsedMax = max ? Number(max) : null;

    const safeMin = parsedMin !== null && !Number.isNaN(parsedMin) ? parsedMin : null;
    const safeMax = parsedMax !== null && !Number.isNaN(parsedMax) ? parsedMax : null;

    this.store.setPriceFilter(safeMin, safeMax);
  }

  setMinRating(rating: number | null): void {
    this.store.setMinRating(rating);
  }
}
