import { Component, input, output } from '@angular/core';
import { Product } from '../../../features/products/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  cardClick = output<void>();

  onClick(): void {
    this.cardClick.emit();
  }
}
