import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from 'src/app/api/recipe/recipe-api.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor(private recipeApiService: RecipeApiService) {}

  ngOnInit(): void {
    this.recipeApiService.fetchRecipes();
    console.log('Fetching from DB');
  }
}
