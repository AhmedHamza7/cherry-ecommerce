import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private _products = signal<Product[]>([]);
  private _selectedProduct = signal<Product | null>(null);
  private _loading = signal(false);
  private _detailsLoading = signal(false);
  private _drawerVisible = signal(false);

  readonly products = this._products.asReadonly();
  readonly selectedProduct = this._selectedProduct.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly detailsLoading = this._detailsLoading.asReadonly();
  readonly drawerVisible = this._drawerVisible.asReadonly();

  readonly filteredProducts = computed(() => {
    const list = this._products();
    const category = this._selectedCategory();
    if (!category) return list;
    return list.filter((p) => p.category === category);
  });

  private _selectedCategory = signal<string | null>(null);
  readonly selectedCategory = this._selectedCategory.asReadonly();

  readonly categories = computed(() => {
    const list = this._products();
    const set = new Set(list.map((p) => p.category));
    return Array.from(set).sort();
  });

  constructor(private productsService: ProductsService) {}

  loadProducts(): void {
    this._loading.set(true);
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this._products.set(data);
        this._loading.set(false);
      },
      error: () => this._loading.set(false)
    });
  }

  selectProduct(id: number): void {
    this._selectedProduct.set(null);
    this._detailsLoading.set(true);
    this._drawerVisible.set(true);
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this._selectedProduct.set(product);
        this._detailsLoading.set(false);
      },
      error: () => {
        this._detailsLoading.set(false);
        this._drawerVisible.set(false);
      }
    });
  }

  setCategory(category: string | null): void {
    this._selectedCategory.set(category);
  }

  closeDrawer(): void {
    this._drawerVisible.set(false);
    this._selectedProduct.set(null);
  }
}
