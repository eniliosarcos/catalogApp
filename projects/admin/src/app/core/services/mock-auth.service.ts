import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthState, LoginRequest, LoginResponse, User } from '@shared/models/auth.model';
import { AuthService } from '@shared/services/auth.service';

const MOCK_USER: User = {
  id: '1',
  email: 'admin@cerise.com',
  name: 'Administrador',
};

const MOCK_CREDENTIALS: Record<string, string> = {
  'admin@cerise.com': 'admin123',
};

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const TOKEN_EXPIRY_HOURS = 24;

@Injectable()
export class MockAuthService extends AuthService {
  private authState$ = new BehaviorSubject<AuthState>(this.getStoredAuthState());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const password = MOCK_CREDENTIALS[credentials.email];

    if (!password || password !== credentials.password) {
      return throwError(() => new Error('Credenciales incorrectas')).pipe(delay(800));
    }

    const token = this.generateMockToken();
    const response: LoginResponse = { token, user: MOCK_USER };

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));

    this.authState$.next({
      isAuthenticated: true,
      user: MOCK_USER,
      token,
    });

    return of(response).pipe(delay(800));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.authState$.next({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  }

  getAuthState(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private getStoredAuthState(): AuthState {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);

    if (!token || !userJson) {
      return { isAuthenticated: false, user: null, token: null };
    }

    if (this.isTokenExpired(token)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return { isAuthenticated: false, user: null, token: null };
    }

    try {
      const user = JSON.parse(userJson) as User;
      return { isAuthenticated: true, user, token };
    } catch {
      return { isAuthenticated: false, user: null, token: null };
    }
  }

  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: '1',
      email: 'admin@cerise.com',
      iat: Date.now(),
      exp: Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000,
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      const payload = JSON.parse(atob(parts[1]));
      return Date.now() > payload.exp;
    } catch {
      return true;
    }
  }
}
