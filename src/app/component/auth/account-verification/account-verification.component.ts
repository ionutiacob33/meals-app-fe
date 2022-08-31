import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountVerificationResponse } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css'],
})
export class AccountVerificationComponent implements OnInit {
  verificationToken!: string;
  isLoading = false;
  activationSuccess = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.verificationToken = params['token'];
    });
    let activationObs: Observable<AccountVerificationResponse>;
    activationObs = this.authService.activateUser(this.verificationToken);
    activationObs.subscribe((resData) => {
      console.log(resData);
      this.isLoading = false;
      if (resData.statusCode !== 200) {
        this.error = resData.message;
      } else {
        this.activationSuccess = true;
        this.router.navigate(['/auth']);
        alert('Account activated succesfully');
      }
    });
  }
}
