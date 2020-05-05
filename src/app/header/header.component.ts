import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipesService } from '../recipes/services/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {}

  onSaveData() {
    this.dataStorageService.saveDatatoDB();
  }

  onFetchData() {
    this.dataStorageService.fetchDataFromDB().subscribe();
  }
}
