import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { GetAllRecipesResponse, SaveRecipeResponse } from '../model/data.model';
import { exhaustMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { DetailedRecipe } from '../model/detailed-recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeMultipleRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log(recipes);
    this.http
      .put('http://localhost:8080/api/recipe/multiple', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  saveRecipe(recipe: DetailedRecipe) {
    this.http
      .post<SaveRecipeResponse>('http://localhost:8080/api/recipe', recipe)
      .subscribe((response) => {
        recipe = response.data.recipe;
        console.log(recipe);
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<GetAllRecipesResponse>(
          'http://localhost:8080/api/recipe/user'
        );
      }),
      tap((resData) => {
        if (resData.status === 'OK' && resData.statusCode === 200) {
          this.recipeService.setRecipes(resData.data.recipes);
        } else {
          alert(
            'Error retrieving recipes ' + resData.message + ' please try again'
          );
          this.authService.refreshAuthToken();
        }
      })
    );
  }
}
