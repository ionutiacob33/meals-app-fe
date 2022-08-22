import { DetailedRecipe } from 'src/app/model/detailed-recipe.model';

export interface GetAllRecipesResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: GetRecipesDataObject;
}

interface GetRecipesDataObject {
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

export interface EditRecipeResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: EditRecipeDataObject;
}

interface EditRecipeDataObject {
  recipe: DetailedRecipe;
}

export interface DeleteRecipeResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: DeleteRecipeDataObject;
}

interface DeleteRecipeDataObject {
  recipeDeleted: boolean;
}
