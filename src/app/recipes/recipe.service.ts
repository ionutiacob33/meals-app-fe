import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe.model";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      "Burger",
      "Delicious Burger",
      "https://thumbs.dreamstime.com/z/burger-3823314.jpg"
    ),
    new Recipe(
      2,
      "Pasta",
      "Delicious Pasta",
      "https://media.istockphoto.com/photos/ro/spaghete-%C3%AEntr-un-vas-pe-un-fundal-alb-id1144823591?s=612x612"
    ),
    new Recipe(
      3,
      "Salad",
      "Delicious Salad",
      "https://st.depositphotos.com/1004373/1268/i/950/depositphotos_12682057-stock-photo-fresh-salad.jpg"
    )
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

}
