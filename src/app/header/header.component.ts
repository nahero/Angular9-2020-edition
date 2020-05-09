import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { RecipesService } from '../recipes/services/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  userAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('Header component loaded');

    this.userSub = this.authService.user.subscribe((user) => {
      console.log('User in header component: ', user);
      this.userAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.saveDatatoDB();
  }

  onFetchData() {
    this.dataStorageService.fetchDataFromDB().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  autoLoginTest() {
    this.authService.autoLogin();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
