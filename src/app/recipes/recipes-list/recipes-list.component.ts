import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangedSub: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesChangedSub = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(name: string, desc: string, imgPath: string) {
    this.recipesService.createRecipe(name, desc, imgPath);
  }

  ngOnDestroy() {
    this.recipesChangedSub.unsubscribe();
  }
}
