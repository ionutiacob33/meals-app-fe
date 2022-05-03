import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../model/recipe.model";
import {RecipeService} from "../../../service/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ShoppingListService} from "../../../service/shopping-list.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(index: number) {
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
