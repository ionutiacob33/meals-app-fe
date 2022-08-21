import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeApiService } from 'src/app/api/recipe/recipe-api.service';
import { RecipeService } from '../../../service/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id!: number;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeApiService: RecipeApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      //TODO check where the value is lost
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      console.log(this.recipeForm.value);
      this.recipeApiService.saveRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        unit: new FormControl(null, [Validators.required]),
      })
    );
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(i);
  }

  get ingredientsArray() {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  onAddStep() {
    (<FormArray>this.recipeForm.get('recipeSteps')).push(
      new FormGroup({
        count: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        description: new FormControl(null, [Validators.required]),
      })
    );
  }

  onDeleteStep(i: number) {
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(i);
  }

  get stepsArray() {
    return this.recipeForm.get('recipeSteps') as FormArray;
  }

  onAddCookingTime() {
    (<FormArray>this.recipeForm.get('recipeCookingTimes')).push(
      new FormGroup({
        hours: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[0-9]*$/),
        ]),
        minutes: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        title: new FormControl(null, [Validators.required]),
      })
    );
  }

  onDeleteCookingTime(i: number) {
    (<FormArray>this.recipeForm.get('recipeCookingTimes')).removeAt(i);
  }

  get cookingTimesArray() {
    return this.recipeForm.get('recipeCookingTimes') as FormArray;
  }

  initForm() {
    let recipeTitle = '';
    let recipeImageUrl = '';
    let recipeSource = '';
    let recipeUrl = '';
    let recipeYeald = 0;
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipeSteps = new FormArray([]);
    let recipeCookingTimes = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeTitle = recipe.title;
      recipeImageUrl = recipe.imageUrl;
      recipeSource = recipe.source;
      recipeUrl = recipe.url;
      recipeYeald = recipe.yeald;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/),
              ]),
              unit: new FormControl(ingredient.unit, [Validators.required]),
            })
          );
        }
      }
      if (recipe['steps']) {
        for (let step of recipe.steps) {
          recipeSteps.push(
            new FormGroup({
              count: new FormControl(step.count, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
              description: new FormControl(step.description, [
                Validators.required,
              ]),
            })
          );
        }
      }
      if (recipe['cookingTimes']) {
        for (let cookingTime of recipe.cookingTimes) {
          recipeCookingTimes.push(
            new FormGroup({
              title: new FormControl(cookingTime.title, [Validators.required]),
              hours: new FormControl(cookingTime.hours, [
                Validators.required,
                Validators.pattern(/^[0-9]+[0-9]*$/),
              ]),
              minutes: new FormControl(cookingTime.minutes, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(recipeTitle, [Validators.required]),
      imageUrl: new FormControl(recipeImageUrl, [Validators.required]),
      source: new FormControl(recipeSource, [Validators.required]),
      url: new FormControl(recipeUrl, [Validators.required]),
      yeald: new FormControl(recipeYeald, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      recipeIngredients: recipeIngredients,
      recipeSteps: recipeSteps,
      recipeCookingTimes: recipeCookingTimes,
    });
  }
}
