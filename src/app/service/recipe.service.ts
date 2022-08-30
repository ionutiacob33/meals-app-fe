import { Injectable } from '@angular/core';
import { DetailedRecipe } from '../model/detailed-recipe.model';
import { Ingredient } from '../model/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: DetailedRecipe[] = [];
  recipesChanged = new Subject<DetailedRecipe[]>();

  getRecipes(): DetailedRecipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  setRecipes(recipes: DetailedRecipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: DetailedRecipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: DetailedRecipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
