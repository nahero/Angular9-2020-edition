import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { RecipesService } from '../recipes/services/recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  saveDatatoDB() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put('https://recipe-app-eb129.firebaseio.com/recipes.json', recipes)
      // PUT overwrites all data under that node. Also it doesn't add the parent object (like post does)
      .pipe(
        tap((event) => {
          console.log('Tapped event: ', event);
        })
      )
      .subscribe((data) => {
        console.log('Response data: ', data);
      });
  }

  fetchDataFromDB() {
    return this.http
      .get<Recipe[]>('https://recipe-app-eb129.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
          console.log('Fetch request sent');
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
