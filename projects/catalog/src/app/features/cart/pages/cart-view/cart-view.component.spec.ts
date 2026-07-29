import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartViewComponent } from './cart-view.component';
import { CartService } from '@shared/services/cart.service';
import { MockCartService } from '../../../core/services/mock-cart.service';
import { of } from 'rxjs';
import { Cart } from '@shared/models/cart.model';

describe('CartViewComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;
  let cartService: MockCartService;

  const mockEmptyCart: Cart = {
    id: '1',
    items: [],
    code: 'CAR-TEST',
    createdAt: new Date().toISOString()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartViewComponent],
      providers: [
        { provide: CartService, useClass: MockCartService }
      ]
    }).compileComponents();

    cartService = TestBed.inject(CartService) as unknown as MockCartService;
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state initially', () => {
    expect(component.loading).True;
  });

  it('should load cart on init', (done) => {
    spyOn(cartService, 'getCart').and.returnValue(of(mockEmptyCart));

    fixture.detectChanges();

    expect(component.cart).toBeTruthy();
    expect(component.cart!.items.length).toBe(0);
    expect(component.loading).False;
    done();
  });

  it('should render empty cart message', (done) => {
    spyOn(cartService, 'getCart').and.returnValue(of(mockEmptyCart));

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-cart')).toBeTruthy();
    done();
  });

  it('should have breadcrumb items', () => {
    expect(component.breadcrumbItems.length).toBe(2);
    expect(component.breadcrumbItems[0].label).toBe('Inicio');
    expect(component.breadcrumbItems[1].label).toBe('Carrito');
  });

  it('should call removeItem on cart service', () => {
    spyOn(cartService, 'removeItem').and.returnValue(of(mockEmptyCart));

    component.removeItem('1');

    expect(cartService.removeItem).toHaveBeenCalledWith('1');
  });

  it('should call updateQuantity on cart service', () => {
    spyOn(cartService, 'updateQuantity').and.returnValue(of(mockEmptyCart));

    component.updateQuantity('1', 5);

    expect(cartService.updateQuantity).toHaveBeenCalledWith('1', 5);
  });
});
