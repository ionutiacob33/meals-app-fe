import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';
import { RecipeApiService } from 'src/app/api/recipe/recipe-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuth = false;

  constructor(
    private authService: AuthService,
    private recipeApiService: RecipeApiService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  onSaveData() {
    this.recipeApiService.storeMultipleRecipes();
  }

  onFetchData() {
    this.recipeApiService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
