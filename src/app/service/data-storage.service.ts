import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {GetAllRecipesResponse} from "../model/data.model";
import {exhaustMap, take, tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(
        user => {
          return this.http
            .get<GetAllRecipesResponse>('http://localhost:8080/api/recipe');
        }
      ),
      tap(resData => {
          if (resData.status === 'OK' && resData.statusCode === 200) {
            this.recipeService.setRecipes(resData.data.recipes)
          } else {
            alert('Error retrieving recipes ' + resData.message);
          }
        }
      )
    );
  }

}
