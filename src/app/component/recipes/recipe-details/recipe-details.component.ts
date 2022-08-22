import { Component, OnInit } from '@angular/core';
import { DetailedRecipe } from '../../../model/detailed-recipe.model';
import { RecipeService } from '../../../service/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from '../../../service/shopping-list.service';
import { RecipeApiService } from 'src/app/api/recipe/recipe-api.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: DetailedRecipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private recipeApiService: RecipeApiService,
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      console.log(this.recipe);
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    let recipeToDelete = this.recipeService.getRecipe(this.id);
    this.recipeService.deleteRecipe(this.id);
    this.recipeApiService.deleteRecipe(recipeToDelete.id);

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
