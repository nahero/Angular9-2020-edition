import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() errorMessage: string;
  @Output() closeError = new EventEmitter<void>();

  constructor() {}

  onClose() {
    this.closeError.emit();
  }
}
