import { TestBed } from '@angular/core/testing';
import { MockCategoryService } from './mock-category.service';

describe('MockCategoryService', () => {
  let service: MockCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return categories', (done) => {
      service.getAll().subscribe(categories => {
        expect(categories.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return categories with required fields', (done) => {
      service.getAll().subscribe(categories => {
        const category = categories[0];
        expect(category.id).toBeTruthy();
        expect(category.name).toBeTruthy();
        expect(category.slug).toBeTruthy();
        done();
      });
    });
  });

  describe('getById', () => {
    it('should return category by id', (done) => {
      service.getAll().subscribe(categories => {
        const firstCategory = categories[0];
        service.getById(firstCategory.id).subscribe(found => {
          expect(found).toBeTruthy();
          expect(found!.id).toBe(firstCategory.id);
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
    it('should return category by slug', (done) => {
      service.getAll().subscribe(categories => {
        const firstCategory = categories[0];
        service.getBySlug(firstCategory.slug).subscribe(found => {
          expect(found).toBeTruthy();
          expect(found!.slug).toBe(firstCategory.slug);
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

  describe('create', () => {
    it('should create new category', (done) => {
      const newCategory = {
        name: 'Test Category',
        slug: 'test-category',
        description: 'Test description',
        image: 'test.jpg'
      };

      service.create(newCategory).subscribe(created => {
        expect(created.id).toBeTruthy();
        expect(created.name).toBe('Test Category');
        done();
      });
    });
  });
});
