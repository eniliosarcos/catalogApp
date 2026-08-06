import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState, LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable()
export abstract class AuthService {
  abstract login(credentials: LoginRequest): Observable<LoginResponse>;
  abstract logout(): void;
  abstract getAuthState(): Observable<AuthState>;
  abstract isAuthenticated(): boolean;
  abstract getToken(): string | null;
}
