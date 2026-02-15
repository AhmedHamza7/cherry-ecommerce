import { Component, inject, OnInit } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { PrimeTemplate } from 'primeng/api';
import { ProductsStore } from '../../store/products.store';
import { ProductsFiltersComponent } from '../../components/products-filters/products-filters.component';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [Drawer, PrimeTemplate, ProductsFiltersComponent, ProductsListComponent, ProductDetailsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  readonly store = inject(ProductsStore);

  ngOnInit(): void {
    this.store.loadProducts();
  }

  onDrawerVisibleChange(visible: boolean): void {
    if (!visible) this.store.closeDrawer();
  }
}
