import { TestBed } from '@angular/core/testing';
import { MockCartService } from './mock-cart.service';
import { Product } from '@shared/models/product.model';

function mockProduct(id: string, name: string, price: number): Product {
  return {
    id, name, slug: `slug-${id}`, description: '', price,
    stock: 10, sku: `SKU-${id}`, categoryId: 'cat-1',
    images: [], tags: [], isActive: true, createdAt: new Date().toISOString()
  };
}

describe('MockCartService', () => {
  let service: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCartService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateCode', () => {
    it('should generate code starting with CAR-', () => {
      const code = service.generateCode();
      expect(code.startsWith('CAR-')).True;
    });

    it('should generate code with 5 characters after prefix', () => {
      const code = service.generateCode();
      expect(code.length).toBe(9);
    });

    it('should only contain uppercase letters and numbers', () => {
      const code = service.generateCode();
      const validChars = /^[A-Z0-9]+$/;
      expect(validChars.test(code.replace('CAR-', ''))).True;
    });
  });

  describe('getCart', () => {
    it('should return empty cart initially', (done) => {
      service.getCart().subscribe(cart => {
        expect(cart.items.length).toBe(0);
        expect(cart.code.startsWith('CAR-')).True;
        done();
      });
    });
  });

  describe('addItem', () => {
    it('should add item to cart', (done) => {
      const product = mockProduct('1', 'Test Product', 99.99);
      service.addItem(product, 1).subscribe(cart => {
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].productId).toBe('1');
        expect(cart.items[0].product.name).toBe('Test Product');
        expect(cart.items[0].quantity).toBe(1);
        done();
      });
    });

    it('should increment quantity if item exists', (done) => {
      const product = mockProduct('1', 'Test Product', 99.99);
      service.addItem(product, 1).subscribe(() => {
        service.addItem(product, 2).subscribe(cart => {
          expect(cart.items.length).toBe(1);
          expect(cart.items[0].quantity).toBe(3);
          done();
        });
      });
    });

    it('should persist to localStorage', (done) => {
      const product = mockProduct('1', 'Test Product', 99.99);
      service.addItem(product, 1).subscribe(() => {
        const saved = localStorage.getItem('catalog_cart');
        expect(saved).toBeTruthy();
        const parsed = JSON.parse(saved!);
        expect(parsed.items.length).toBe(1);
        expect(parsed.items[0].product.name).toBe('Test Product');
        done();
      });
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', (done) => {
      const product = mockProduct('1', 'Test Product', 99.99);
      service.addItem(product, 1).subscribe(() => {
        service.removeItem('1').subscribe(cart => {
          expect(cart.items.length).toBe(0);
          done();
        });
      });
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', (done) => {
      const product = mockProduct('1', 'Test Product', 99.99);
      service.addItem(product, 1).subscribe(() => {
        service.updateQuantity('1', 5).subscribe(cart => {
          expect(cart.items[0].quantity).toBe(5);
          done();
        });
      });
    });

    it('should remove item if quantity is 0', (done) => {
      const product = mockProduct('1', 'Test Product', 99.99);
      service.addItem(product, 1).subscribe(() => {
        service.updateQuantity('1', 0).subscribe(cart => {
          expect(cart.items.length).toBe(0);
          done();
        });
      });
    });
  });

  describe('clearCart', () => {
    it('should clear all items', (done) => {
      const p1 = mockProduct('1', 'Product 1', 50);
      const p2 = mockProduct('2', 'Product 2', 75);
      service.addItem(p1, 1).subscribe(() => {
        service.addItem(p2, 2).subscribe(() => {
          service.clearCart().subscribe(cart => {
            expect(cart.items.length).toBe(0);
            done();
          });
        });
      });
    });

    it('should generate new code', (done) => {
      service.getCart().subscribe(initialCart => {
        service.clearCart().subscribe(newCart => {
          expect(newCart.code).not.toBe(initialCart.code);
          done();
        });
      });
    });
  });
});
