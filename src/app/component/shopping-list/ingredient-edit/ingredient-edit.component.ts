import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListApiService } from 'src/app/api/shopping-list/shopping-list-api.service';
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
    private shoppingListApiService: ShoppingListApiService
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editMode = true;
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
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
      this.shoppingListApiService.saveShoppingListIngredient(
        this.ingredientForm.value
      );
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
    this.shoppingListApiService.deleteShoppingListIngredient(
      this.editedItemIndex
    );
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm() {
    let name = '';
    let unit = '';
    let amount; // = 0;

    if (this.editMode) {
      const shoppingListIngredient = this.shoppingListService.getIngredient(
        this.editedItemIndex
      );
      name = shoppingListIngredient.name;
      unit = shoppingListIngredient.unit;
      amount = shoppingListIngredient.amount;
    }

    this.ingredientForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      unit: new FormControl(unit),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }
}
