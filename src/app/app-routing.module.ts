import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./component/recipes/recipes.component";
import {ShoppingListComponent} from "./component/shopping-list/shopping-list.component";
import {AuthComponent} from "./component/auth/auth.component";
import {RecipeDetailsComponent} from "./component/recipes/recipe-details/recipe-details.component";

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {path: ':id', component: RecipeDetailsComponent}
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: '**', redirectTo: '/recipes', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
