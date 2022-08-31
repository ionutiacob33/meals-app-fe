import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './component/recipes/recipes.component';
import { ShoppingListComponent } from './component/shopping-list/shopping-list.component';
import { AuthComponent } from './component/auth/auth.component';
import { RecipeDetailsComponent } from './component/recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './component/recipes/recipe-edit/recipe-edit.component';
import { AuthGuard } from './guard/auth-guard';
import { AccountVerificationComponent } from './component/auth/account-verification/account-verification.component';

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accountVerification/:token',
    component: AccountVerificationComponent,
  },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '**', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
