import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../../../service/recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id!: number;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'quantity': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'unit': new FormControl(null, [Validators.required])
      })
    );
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(i);
  }

  get ingredientsArray() {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  initForm() {
    let recipeTitle = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeTitle = recipe.title;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;
      if (recipe['recipeIngredients']) {
        for (let ingredient of recipe.recipeIngredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.ingredient, [Validators.required]),
              'quantity': new FormControl(ingredient.quantity, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              'unit': new FormControl(ingredient.unit, [Validators.required])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(recipeTitle, [Validators.required]),
      'imageUrl': new FormControl(recipeImageUrl, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'recipeIngredients': recipeIngredients
    });
  }

}
