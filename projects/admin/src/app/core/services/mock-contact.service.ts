import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ContactConfig } from '@shared/models/environment.model';
import { ContactService } from '@shared/services/contact.service';
import { environment } from '@env';

const CONTACT_KEY = 'contact_config';

@Injectable()
export class MockContactService extends ContactService {
  private contact$ = new BehaviorSubject<ContactConfig>(this.getStoredContact());

  getContact(): Observable<ContactConfig> {
    return this.contact$.asObservable();
  }

  updateContact(config: ContactConfig): Observable<ContactConfig> {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(config));
    this.contact$.next(config);
    return of(config);
  }

  private getStoredContact(): ContactConfig {
    const stored = localStorage.getItem(CONTACT_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as ContactConfig;
      } catch {
        // fallback to environment
      }
    }
    return { ...environment.contact };
  }
}
