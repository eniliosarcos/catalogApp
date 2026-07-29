import { TestBed } from '@angular/core/testing';
import { MockProductService } from './mock-product.service';

describe('MockProductService', () => {
  let service: MockProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return only active products', (done) => {
      service.getAll().subscribe(products => {
        expect(products.length).toBeGreaterThan(0);
        expect(products.every(p => p.isActive)).True;
        done();
      });
    });

    it('should return products with required fields', (done) => {
      service.getAll().subscribe(products => {
        const product = products[0];
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.slug).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('getById', () => {
    it('should return product by id', (done) => {
      service.getAll().subscribe(products => {
        const firstProduct = products[0];
        service.getById(firstProduct.id).subscribe(found => {
          expect(found).toBeTruthy();
          expect(found!.id).toBe(firstProduct.id);
          done();
        });
      });
    });

    it('should return undefined for non-existent id', (done) => {
      service.getById('non-existent-id').subscribe(found => {
        expect(found).Undefined;
        done();
      });
    });
  });

  describe('getBySlug', () => {
    it('should return product by slug', (done) => {
      service.getAll().subscribe(products => {
        const firstProduct = products[0];
        service.getBySlug(firstProduct.slug).subscribe(found => {
          expect(found).toBeTruthy();
          expect(found!.slug).toBe(firstProduct.slug);
          done();
        });
      });
    });

    it('should return undefined for non-existent slug', (done) => {
      service.getBySlug('non-existent-slug').subscribe(found => {
        expect(found).Undefined;
        done();
      });
    });
  });

  describe('getByCategory', () => {
    it('should return products for a category', (done) => {
      service.getAll().subscribe(products => {
        const categoryId = products[0].categoryId;
        service.getByCategory(categoryId).subscribe(filtered => {
          expect(filtered.length).toBeGreaterThan(0);
          expect(filtered.every(p => p.categoryId === categoryId)).True;
          done();
        });
      });
    });

    it('should return empty array for non-existent category', (done) => {
      service.getByCategory('non-existent').subscribe(filtered => {
        expect(filtered.length).toBe(0);
        done();
      });
    });
  });

  describe('create', () => {
    it('should create new product', (done) => {
      const newProduct = {
        name: 'Test Product',
        slug: 'test-product',
        description: 'Test description',
        price: 99.99,
        categoryId: '1',
        images: [],
        isActive: true,
        stock: 10
      };

      service.create(newProduct).subscribe(created => {
        expect(created.id).toBeTruthy();
        expect(created.name).toBe('Test Product');
        expect(created.createdAt).toBeTruthy();
        done();
      });
    });
  });
});
