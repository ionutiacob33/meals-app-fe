import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
import {RecipeDetailsComponent} from './component/recipes/recipe-details/recipe-details.component';
import {RecipeEditComponent} from './component/recipes/recipe-edit/recipe-edit.component';
import {AuthService} from "./service/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";

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
    RecipeDetailsComponent,
    RecipeEditComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
