import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../../service/shopping-list.service';
import { Ingredient } from '../../model/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListApiService } from 'src/app/api/shopping-list/shopping-list-api.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] | undefined;
  private subscription!: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private shoppingListApiService: ShoppingListApiService
  ) {}

  ngOnInit(): void {
    this.shoppingListApiService.fetchShoppingListIngredients();
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
