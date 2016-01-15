import {Directive, Component, ElementRef, Renderer, Input} from 'angular2/core';
import {Event} from './models/Event';


@Component({
    selector: 'EventDetail',
    providers: [],
    directives: [],
    pipes: [],
    styles: [],
    template: `
        <div>
            <button (click)="onRemove(item.id)" class="btn btn-default pull-left">x</button>
            {{ item | json }}
        </div>
        `
})
export class EventDetail {
    
  @Input() item:Event;
  @Input('on-remove') onRemove:Event;
  
  constructor(element: ElementRef, renderer: Renderer) {
  }
}
