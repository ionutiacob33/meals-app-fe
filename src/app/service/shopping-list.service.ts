import { Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    // new Ingredient(1, 'Apple', 'pieces', 5),
    // new Ingredient(2, 'Tomatoes', 'pieces', 10),
    // new Ingredient(3, 'Flour', 'grams', 500),
    // new Ingredient(4, 'Sugar', 'grams', 100),
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearIngredients() {
    this.ingredients = [];
  }
}
