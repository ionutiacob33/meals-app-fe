import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        } else if (req.url === 'http://localhost:8080/api/auth/token/refresh') {
          return next.handle(req);
        } else if (req.url === 'http://localhost:8080/api/image/upload') {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${user.token}`,
          });
          const modifiedReq = req.clone({ headers: headers });
          return next.handle(modifiedReq);
        } else {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          });
          const modifiedReq = req.clone({ headers: headers });
          return next.handle(modifiedReq);
        }
      })
    );
  }
}
