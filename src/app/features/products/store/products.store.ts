import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Injectable({ providedIn: 'root' })
export class ProductsStore {

  // private props to edit state values locally without getting them to the outside
  private _products = signal<Product[]>([]);
  private _selectedProduct = signal<Product | null>(null);
  private _loading = signal(false);
  private _detailsLoading = signal(false);
  private _drawerVisible = signal(false);

  private _selectedCategory = signal<string | null>(null);
  private _priceFilter = signal<{ min: number | null; max: number | null }>({ min: null, max: null });
  private _minRating = signal<number | null>(null);

  // readonly props to only show values to the outside, not allow to edit them.
  // asReadonly() is a method that returns a readonly version of the signal
  readonly products = this._products.asReadonly();
  readonly selectedProduct = this._selectedProduct.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly detailsLoading = this._detailsLoading.asReadonly();
  readonly drawerVisible = this._drawerVisible.asReadonly();

  readonly selectedCategory = this._selectedCategory.asReadonly();
  readonly priceFilter = this._priceFilter.asReadonly();
  readonly minRating = this._minRating.asReadonly();

  readonly filteredProducts = computed(() => {
    const list = this._products();
    const category = this._selectedCategory();
    const priceFilter = this._priceFilter();
    const minRating = this._minRating();

    let result = list;

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (priceFilter.min != null) {
      result = result.filter((p) => p.price >= priceFilter.min!);
    }

    if (priceFilter.max != null) {
      result = result.filter((p) => p.price <= priceFilter.max!);
    }

    if (minRating != null) {
      result = result.filter((p) => p.rating?.rate >= minRating);
    }

    return result;
  });

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

  setPriceFilter(min: number | null, max: number | null): void {
    this._priceFilter.set({ min, max });
  }

  setMinRating(rating: number | null): void {
    this._minRating.set(rating);
  }

  closeDrawer(): void {
    this._drawerVisible.set(false);
    this._selectedProduct.set(null);
  }
}
