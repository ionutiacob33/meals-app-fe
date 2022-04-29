import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './component/header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {RecipesComponent} from './component/recipes/recipes.component';
import {RecipeListComponent} from './component/recipes/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './component/recipes/recipe-list/recipe-item/recipe-item.component';
import {RecipeService} from "./service/recipe.service";
import {ShoppingListComponent} from './component/shopping-list/shopping-list.component';
import {AuthComponent} from './component/auth/auth.component';
import {ShoppingListService} from "./service/shopping-list.service";
import {IngredientEditComponent} from './component/shopping-list/ingredient-edit/ingredient-edit.component';
import { RecipeDetailsComponent } from './component/recipes/recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    AuthComponent,
    IngredientEditComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    RecipeService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
