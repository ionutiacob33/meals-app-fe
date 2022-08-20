import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import {
  GetAllPantryIngredientsResponse,
  GetAllRecipesResponse,
  GetAllShoppingListIngredientsResponse,
  SaveIngredientResponse,
  SaveRecipeResponse,
  SaveShoppingListIngredientResponse,
} from '../model/data.model';
import { exhaustMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { DetailedRecipe } from '../model/detailed-recipe.model';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../model/ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
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

  saveShoppingListIngredient(ingredient: Ingredient) {
    this.http
      .post<SaveShoppingListIngredientResponse>(
        'http://localhost:8080/api/shopping',
        ingredient
      )
      .subscribe((response) => {
        ingredient = response.data.shoppingListIngredient;
        console.log(ingredient);
      });
  }

  fetchShoppingListIngredients() {
    this.shoppingListService.clearIngredients();
    this.http
      .get<GetAllShoppingListIngredientsResponse>(
        'http://localhost:8080/api/shopping/user'
      )
      .subscribe((response) => {
        if (response.status === 'OK' && response.statusCode === 200) {
          this.shoppingListService.addIngredients(
            response.data.shoppingListIngredients
          );
          console.log(response.data.shoppingListIngredients);
        } else {
          alert(
            'Error retrieving shopping list ingredients ' +
              response.message +
              ' please try again'
          );
          this.authService.refreshAuthToken();
        }
      });
  }
}
