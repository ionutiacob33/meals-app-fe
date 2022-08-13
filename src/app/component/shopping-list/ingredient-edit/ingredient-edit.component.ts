import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { Ingredient } from '../../../model/ingredient.model';
import { ShoppingListService } from '../../../service/shopping-list.service';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css'],
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  ingredientForm!: FormGroup;
  editMode = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editMode = true;
        this.ingredientForm.setValue({
          ingredient: this.editedItem.name,
          quantity: this.editedItem.amount,
          unit: this.editedItem.unit,
        });
      }
    );
    this.initForm();
  }

  onSubmit() {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        this.ingredientForm.value
      );
    } else {
      this.shoppingListService.addIngredient(this.ingredientForm.value);
      console.log(this.ingredientForm.value);
      this.dataStorageService.saveIngredient(this.ingredientForm.value);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm() {
    let ingredient = '';
    let unit = '';
    let quantity; // = 0;

    if (this.editMode) {
      const pantryIngredient = this.shoppingListService.getIngredient(
        this.editedItemIndex
      );
      ingredient = pantryIngredient.name;
      unit = pantryIngredient.unit;
      quantity = pantryIngredient.amount;
    }

    this.ingredientForm = new FormGroup({
      ingredient: new FormControl(ingredient, [Validators.required]),
      unit: new FormControl(unit),
      quantity: new FormControl(quantity, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }
}
