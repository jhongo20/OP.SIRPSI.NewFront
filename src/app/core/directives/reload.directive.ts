import {
  Directive,
  OnChanges,
  SimpleChanges,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appReload]',
})
export class ReloadDirective implements OnChanges {
  @Input() appReload!: number;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef.createEmbeddedView(templateRef);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appReload']) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
