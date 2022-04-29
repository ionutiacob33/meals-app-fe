import {Injectable} from "@angular/core";
import {Recipe} from "../model/recipe.model";
import {Ingredient} from "../model/ingredient.model";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      "Burger",
      "Delicious Burger",
      "https://thumbs.dreamstime.com/z/burger-3823314.jpg",
      [
        new Ingredient(1, 'Buns', 'pieces', 2),
        new Ingredient(2, 'Meat', 'grams', 180),
        new Ingredient(3, 'Ketchup', 'grams', 10),
        new Ingredient(4, 'Mayo', 'grams', 10),
      ]
    ),
    new Recipe(
      2,
      "Pasta",
      "Delicious Pasta",
      "https://media.istockphoto.com/photos/ro/spaghete-%C3%AEntr-un-vas-pe-un-fundal-alb-id1144823591?s=612x612",
      [
        new Ingredient(1, 'Pasta', 'grams', 100),
        new Ingredient(2, 'Meat', 'grams', 100),
        new Ingredient(3, 'Tomatoes', 'pieces', 5),
        new Ingredient(4, 'Parmesan', 'grams', 50),
      ]

    ),
    new Recipe(
      3,
      "Salad",
      "Delicious Salad",
      "https://st.depositphotos.com/1004373/1268/i/950/depositphotos_12682057-stock-photo-fresh-salad.jpg",
      [
        new Ingredient(1, 'Salad', 'grams', 200),
        new Ingredient(2, 'Tomatoes', 'grams', 100),
        new Ingredient(3, 'Vinegar', 'grams', 10),
        new Ingredient(4, 'Olive Oil', 'grams', 30),
      ]
    )
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
