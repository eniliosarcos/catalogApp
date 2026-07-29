import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { MockProductService } from '../../../core/services/mock-product.service';
import { MockCartService } from '../../../core/services/mock-cart.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '@shared/models/product.model';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: MockProductService;
  let cartService: MockCartService;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    description: 'Test description',
    price: 100,
    discountPrice: 80,
    categoryId: '1',
    images: ['test.jpg'],
    isActive: true,
    stock: 10,
    createdAt: new Date().toISOString()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: CartService, useClass: MockCartService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'slug' ? 'test-product' : null
              }
            }
          }
        }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as unknown as MockProductService;
    cartService = TestBed.inject(CartService) as unknown as MockCartService;
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state initially', () => {
    expect(component.loading).True;
  });

  it('should load product on init', (done) => {
    spyOn(productService, 'getBySlug').and.returnValue(of(mockProduct));

    fixture.detectChanges();

    expect(component.product).toBeTruthy();
    expect(component.product!.name).toBe('Test Product');
    expect(component.loading).False;
    done();
  });

  it('should calculate discount percentage', () => {
    component.product = mockProduct;

    const discount = component.getDiscountPercentage();

    expect(discount).toBe(20); // (100 - 80) / 100 * 100 = 20%
  });

  it('should return 0 discount when no discount price', () => {
    component.product = { ...mockProduct, discountPrice: undefined };

    const discount = component.getDiscountPercentage();

    expect(discount).toBe(0);
  });

  it('should add item to cart', (done) => {
    spyOn(cartService, 'addItem').and.returnValue(of({ id: '1', items: [], code: 'CAR-TEST', createdAt: new Date().toISOString() }));
    component.product = mockProduct;
    component.quantity = 2;

    component.addToCart();

    expect(cartService.addItem).toHaveBeenCalledWith('1', 2);
    expect(component.addedToCart).True;
    done();
  });

  it('should not add to cart if no product', () => {
    spyOn(cartService, 'addItem');
    component.product = null;

    component.addToCart();

    expect(cartService.addItem).not.toHaveBeenCalled();
  });

  it('should not add to cart if quantity is 0', () => {
    spyOn(cartService, 'addItem');
    component.product = mockProduct;
    component.quantity = 0;

    component.addToCart();

    expect(cartService.addItem).not.toHaveBeenCalled();
  });
});
