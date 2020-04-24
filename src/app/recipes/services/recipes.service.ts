import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [
    // private so it's not directly accessible from outside
    new Recipe(
      'Tasty Burger',
      'Mm-mm-mm, this one tasty motherfucking burger, son!',
      'https://images.unsplash.com/photo-1557925923-33b27f891f88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 1),
        new Ingredient('Lettuce', 1),
      ]
    ),
    new Recipe(
      'Fish and Chips',
      'Nuff said.',
      'https://images.unsplash.com/photo-1557925923-33b27f891f88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      [new Ingredient('Fishes', 2), new Ingredient('Chips', 20)]
    ),
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
    // if we only used "return this.recipes" we would access the recipes array directly, this way we access a clone
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  createRecipe(name: string, description: string, imagePath: string) {
    const newRecipe = new Recipe(
      name ? name : 'Test name',
      description ? description : 'Test description',
      imagePath
        ? imagePath
        : 'https://images.unsplash.com/photo-1557925923-33b27f891f88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      [new Ingredient('Kalandraka', 1)]
    );
    this.recipes.push(newRecipe);
  }
}
