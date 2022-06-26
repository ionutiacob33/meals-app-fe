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
