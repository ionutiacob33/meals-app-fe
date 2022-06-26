import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../model/ingredient.model';
import { ShoppingListService } from '../../../service/shopping-list.service';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css'],
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientEditForm!: NgForm;
  subscription!: Subscription;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editMode = true;
        this.ingredientEditForm.setValue({
          name: this.editedItem.ingredient,
          quantity: this.editedItem.quantity,
          unit: this.editedItem.unit,
        });
      }
    );
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(
      value.name,
      value.unit,
      value.quantity
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.ingredientEditForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
