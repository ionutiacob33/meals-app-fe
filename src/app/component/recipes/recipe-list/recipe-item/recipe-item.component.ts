import {Component, Input, OnInit} from '@angular/core';
import {DetailedRecipe} from "../../../../model/detailed-recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: DetailedRecipe;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
