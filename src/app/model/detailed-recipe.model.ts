import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export class DetailedRecipe {
  constructor(
    // public id: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public recipeIngredients: Ingredient[],
    public recipeSteps: Step[]
  ) // public calories?: number,
  // public protein?: number,
  // public fat?: number,
  // public carbs?: number,
  // public apiId?: number,
  {}
}
