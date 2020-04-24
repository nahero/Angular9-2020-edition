import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHoverTrigger]'
})
export class HoverTriggerDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input() hoverColor = 'coral';

  @HostBinding('style.backgroundColor') backgroundColor: string;
  // @HostBinding('which property of the targeted element we want to bind') nameOfVariableToBind: type = 'optional default value to prevent errors';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background', 'coral');
    this.backgroundColor = this.hoverColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background', 'none');
    this.backgroundColor = this.defaultColor;
  }

}
