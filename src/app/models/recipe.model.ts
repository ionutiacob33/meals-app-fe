import {Ingredient} from "./ingredient.model";

export class Recipe {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public ingredients: Ingredient[],
    public calories?: number,
    public protein?: number,
    public fat?: number,
    public carbs?: number,
    public apiId?: number,
  ) { }
}
