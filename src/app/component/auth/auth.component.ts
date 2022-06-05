import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {LoginResponse, SignUpResponse} from "../../model/auth.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const username = form.value.username;
    const password = form.value.password;

    let signUpObs: Observable<SignUpResponse>;
    let loginObs: Observable<LoginResponse>;

    this.isLoading = true;

    if (this.isLoginMode) {
      loginObs = this.authService.login(username, password);
      loginObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes'])
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        });
    } else {
      signUpObs = this.authService.signup(email, username, password);
      signUpObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          if (resData.statusCode !== 200) {
            this.error = resData.message;
          } else {
            this.router.navigate(['/recipes'])
          }
        },
        error => {
          this.error = error.getMessage();
          this.isLoading = false;
        });
    }

    form.reset();
  }
}
