import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginResponse, SignUpResponse} from "../model/auth.model";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, username: string, password: string) {
    return this.http.post<SignUpResponse>(
      'http://localhost:8080/api/auth/signup',
      {
        email: email,
        username: username,
        password: password,
      }
    );
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth/login',
      {
        username: username,
        password: password
      }
    );
  }

}
