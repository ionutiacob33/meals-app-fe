import { Ingredient } from 'src/app/model/ingredient.model';

export interface SaveIngredientResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: SaveIngredientDataObject;
}

interface SaveIngredientDataObject {
  pantryIngredient: Ingredient;
}

export interface SaveShoppingListIngredientResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: SaveShoppingListIngredientDataObject;
}

interface SaveShoppingListIngredientDataObject {
  shoppingListIngredient: Ingredient;
}

export interface GetAllPantryIngredientsResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: GetPantryDataObject;
}

interface GetPantryDataObject {
  pantryIngredients: Ingredient[];
}

export interface GetAllShoppingListIngredientsResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: GetShoppingListDataObject;
}

interface GetShoppingListDataObject {
  shoppingListIngredients: Ingredient[];
}
