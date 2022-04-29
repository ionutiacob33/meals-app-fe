import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../model/recipe.model";
import {RecipeService} from "../../../service/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] | undefined;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    console.log(this.recipes);
  }
}
