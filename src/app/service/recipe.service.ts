import { Injectable } from '@angular/core';
import { DetailedRecipe } from '../model/detailed-recipe.model';
import { Ingredient } from '../model/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: DetailedRecipe[] = [
    // new DetailedRecipe(
    //   'Burger',
    //   'Delicious Burger',
    //   'https://thumbs.dreamstime.com/z/burger-3823314.jpg',
    //   [
    //     new Ingredient('Buns', 'pieces', 2),
    //     new Ingredient('Meat', 'grams', 180),
    //     new Ingredient('Ketchup', 'grams', 10),
    //     new Ingredient('Mayo', 'grams', 10),
    //   ]
    // ),
    // new DetailedRecipe(
    //   'Pasta',
    //   'Delicious Pasta',
    //   'https://media.istockphoto.com/photos/ro/spaghete-%C3%AEntr-un-vas-pe-un-fundal-alb-id1144823591?s=612x612',
    //   [
    //     new Ingredient('Pasta', 'grams', 100),
    //     new Ingredient('Meat', 'grams', 100),
    //     new Ingredient('Tomatoes', 'pieces', 5),
    //     new Ingredient('Parmesan', 'grams', 50),
    //   ]
    // ),
    // new DetailedRecipe(
    //   'Salad',
    //   'Delicious Salad',
    //   'https://st.depositphotos.com/1004373/1268/i/950/depositphotos_12682057-stock-photo-fresh-salad.jpg',
    //   [
    //     new Ingredient('Salad', 'grams', 200),
    //     new Ingredient('Tomatoes', 'grams', 100),
    //     new Ingredient('Vinegar', 'grams', 10),
    //     new Ingredient('Olive Oil', 'grams', 30),
    //   ]
    // ),
  ];

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
