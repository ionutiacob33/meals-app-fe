import {Injectable} from "@angular/core";
import {Ingredient} from "../model/ingredient.model";
import {Subject} from "rxjs";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient(1, 'Apple', 'pieces', 5),
    new Ingredient(1, 'Tomatoes', 'pieces', 10),
    new Ingredient(1, 'Flour', 'grams', 500),
    new Ingredient(1, 'Sugar', 'grams', 100),
  ]

  ingredientsChanged = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }
}
