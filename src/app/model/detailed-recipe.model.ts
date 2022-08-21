import { CookingTime } from './cooking-time.model';
import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export class DetailedRecipe {
  constructor(
    public id: number,
    public userId: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public ingredients: Ingredient[],
    public steps: Step[],
    public cookingTimes: CookingTime[],
    public source: string,
    public url: string,
    public yeald: number
  ) {}
}
