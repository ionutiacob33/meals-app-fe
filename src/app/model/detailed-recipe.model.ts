import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export class DetailedRecipe {
  constructor(
    public id: number,
    public apiId: number,
    public userId: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public recipeIngredients: Ingredient[],
    public recipeSteps: Step[],
    public protein: number,
    public fat: number,
    public carbs: number,
    public calories: number
  ) {}
}
