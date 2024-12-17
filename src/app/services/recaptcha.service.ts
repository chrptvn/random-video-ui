import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<boolean> {
    return this.http.post<boolean>('/api/verify-recaptcha', { token });
  }
}