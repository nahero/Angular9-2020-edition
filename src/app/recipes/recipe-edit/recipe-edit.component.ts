import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onSaveRecipe() {}

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
