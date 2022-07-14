import { Ingredient } from './ingredient.model';
import { DetailedRecipe } from './detailed-recipe.model';

export interface GetAllRecipesResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: DataObject;
}

interface DataObject {
  recipes: DetailedRecipe[];
}

export interface SaveRecipeResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: SaveRecipeDataObject;
}

interface SaveRecipeDataObject {
  recipe: DetailedRecipe;
}

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
