import {Directive, Component, ElementRef, Renderer, Input} from 'angular2/core';
import {Event} from './models/Event';


@Component({
    selector: 'EventCreate',
    providers: [],
    directives: [],
    pipes: [],
    styles: [],
    template: `
        <div>
            <pre> {{ item | json }}</pre>
            
            <form class="loginForm" #loginForm="ngForm" (ngSubmit)="createItem(item)" [hidden]="isLoading">
                
                <div class="form-group">
                    <label for="name">name</label>
                    <input type="text" [(ngModel)]="item.name" ngControl="name" #name="ngForm" class="form-control" id="name" placeholder="name">
                </div>
                
                <div class="form-group">
                    <label for="date">date</label>
                    <input type="date" [(ngModel)]="item.date" ngControl="date" #date="ngForm" class="form-control" id="date" placeholder="date">
                </div>
                
                <div class="form-group">
                    <label for="location">location</label>
                    <input type="text" [(ngModel)]="item.location" ngControl="location" #location="ngForm" class="form-control" id="location" placeholder="location">
                </div>
               
                <div class="form-group">
                    <label for="description">description</label>
                    <input type="text" [(ngModel)]="item.description" ngControl="description" #description="ngForm" class="form-control" id="description" placeholder="description">
                </div>
               
                <div class="form-group">
                    <label for="url">url</label>
                    <input type="text" [(ngModel)]="item.url" ngControl="url" #url="ngForm" class="form-control" id="url" placeholder="url">
                </div>
                
                
             <button class="btn btn-default"> add </button>
            </form>
           
        </div>
        `
})
export class EventCreate {
    
  @Input() item:Event;
  @Input('on-create') onCreate:(Event)=>void;
  
  constructor(element: ElementRef, renderer: Renderer) {
      this.item = new Event();
  }
  createItem(item:Event){
      this.onCreate(item);
  }
  ngOnInit(){
      
  }
}
