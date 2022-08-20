import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingListService } from 'src/app/service/shopping-list.service';
import { AuthService } from 'src/app/service/auth.service';
import { Ingredient } from 'src/app/model/ingredient.model';
import {
  GetAllShoppingListIngredientsResponse,
  SaveShoppingListIngredientResponse,
} from './shopping-list-api.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListApiService {
  constructor(
    private http: HttpClient,
    private shoppingListService: ShoppingListService,
    private authService: AuthService
  ) {}

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

  deleteShoppingListIngredient(editedItemIndex: number) {
    throw new Error('Method not implemented.');
  }
}
