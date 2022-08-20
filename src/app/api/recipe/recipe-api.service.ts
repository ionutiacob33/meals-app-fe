import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailedRecipe } from 'src/app/model/detailed-recipe.model';
import { AuthService } from 'src/app/service/auth.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { GetAllRecipesResponse, SaveRecipeResponse } from './recipe-api.model';
import { exhaustMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
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
      tap((response) => {
        if (response.status === 'OK' && response.statusCode === 200) {
          this.recipeService.setRecipes(response.data.recipes);
        } else {
          alert(
            'Error retrieving recipes ' + response.message + ' please try again'
          );
          this.authService.refreshAuthToken();
        }
      })
    );
  }
}
