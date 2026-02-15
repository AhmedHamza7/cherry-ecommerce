import { Component, inject } from '@angular/core';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  readonly store = inject(ProductsStore);
}
