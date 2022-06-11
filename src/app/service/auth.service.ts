import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginResponse, SignUpResponse} from "../model/auth.model";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "../model/user.model";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  // @ts-ignore
  user = new BehaviorSubject<User>(null);
  private accessToken?: string;
  private refreshToken?: string;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  signup(email: string, username: string, password: string) {
    return this.http
      .post<SignUpResponse>(
      'http://localhost:8080/api/auth/signup',
      {
          email: email,
          username: username,
          password: password,
        }
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/login',
        {
          username: username,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.accessToken = resData.access_token;
          this.refreshToken = resData.refresh_token;
          const user = new User(username, this.accessToken, this.refreshToken);
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        }
      )
    );
  }

  logout() {
    // @ts-ignore
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // TODO: Clear token from backend
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log(errorRes)
    switch (errorRes.status) {
      case 403:
        errorMessage = 'Account not activated';
        break;
    }
    return throwError(errorMessage);
  }

}
