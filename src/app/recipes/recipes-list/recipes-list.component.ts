import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
  }

  onNewRecipe(name: string, desc: string, imgPath: string) {
    this.recipesService.createRecipe(name, desc, imgPath);
  }
}
