import {Directive, Component, ElementRef, Renderer, Input} from 'angular2/core';

export class Event {
    customerId: number =0;
    date:Date = new Date();
    description: string= '';
    id: number = 0;
    location: string= '';
    name: string= 'test';
    url: string= '';
    
    constructor(){
        
    }
}


@Component({
    selector: 'EventDetail',
    providers: [],
    directives: [],
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
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
  ngOnInit(){
      console.log(this);
  }
}
