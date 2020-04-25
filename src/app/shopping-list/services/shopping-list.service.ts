import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [new Ingredient('Test Ingredient', 1)];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index) {
    return this.ingredients[index];
  }

  createIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredientsList: Ingredient[]) {
    // this.ingredients = this.ingredients.concat(ingredientsList);
    this.ingredients.push(...ingredientsList);
    // ... is a spread operator, we are spreading ingredientsList array into its elements
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
