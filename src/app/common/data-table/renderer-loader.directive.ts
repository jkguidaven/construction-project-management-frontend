import {
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { DataTableRenderer } from './renderers/renderer';
import { TextDataTableRendererComponent } from './renderers/text.component';

@Directive({
  selector: '[appRendererLoader]',
})
export class RendererLoaderDirective implements OnInit {
  @Input() renderer!: InstanceType<any>;
  @Input() data!: any;
  @Input() field!: string;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    let componentRef: ComponentRef<DataTableRenderer>;
    if (this.renderer) {
      componentRef = this.viewContainerRef.createComponent(this.renderer);
    } else {
      componentRef = this.viewContainerRef.createComponent(
        TextDataTableRendererComponent
      );
    }

    componentRef.instance.data = this.data;
    componentRef.instance.field = this.field;
  }
}
