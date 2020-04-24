import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdownAlt]'
})

export class DropdownAltDirective {
  dropdownOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  // @HostListener('click') toggleOpen() {
  //   parent = this.renderer.parentNode(this.elRef.nativeElement);
  //   if (!this.dropdownOpen) {
  //     this.renderer.addClass(parent, 'open');
  //   } else {
  //     this.renderer.removeClass(parent, 'open');
  //   }

  //   this.dropdownOpen = !this.dropdownOpen;
  // }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if (this.elRef.nativeElement.contains(event.target)) {
      parent = this.renderer.parentNode(this.elRef.nativeElement);
      if (!this.dropdownOpen) {
        this.renderer.addClass(parent, 'open');
      } else {
        this.renderer.removeClass(parent, 'open');
      }
      this.dropdownOpen = !this.dropdownOpen;
    }

    console.log('dropdownOpen: ' + this.dropdownOpen);

    // this.dropdownOpen = this.elRef.nativeElement.contains(event.target) ? !this.dropdownOpen : false;
  }

}
