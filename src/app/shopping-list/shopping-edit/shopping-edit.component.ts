import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subStartedEditing: Subscription;
  editingMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) slForm: NgForm;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subStartedEditing = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editingMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const newItem = form.value;
    const newIngredient = new Ingredient(newItem.name, newItem.amount);
    if (this.editingMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.createIngredient(newIngredient);
    }
    this.resetForm();
  }

  onDeleteItem() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.resetForm();
  }

  onClear() {
    this.resetForm();
  }

  resetForm() {
    this.slForm.resetForm();
    this.editingMode = false;
  }

  ngOnDestroy() {
    this.subStartedEditing.unsubscribe();
  }
}
