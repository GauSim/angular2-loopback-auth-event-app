import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {CanActivate} from 'angular2/router';


import { Session, UserAuth } from '../user/session';
import { EventService } from './eventService'
import { Event, EventDetail } from './event';


// check if we can rout to thei componet
@CanActivate((next, prev) => Session.getInstance().isAuthenticated())
@Component({
    selector: 'events',
    providers: [],
    directives: [
        ...FORM_DIRECTIVES,
        EventDetail
    ],
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: ` <h1>Events</h1> 
               <button class="btn btn-default" (click)="addItemHandler()"> add </button>
               
               <div *ngFor="#item of events" class="row">
                    <EventDetail [item]="item" [on-remove]="removeItemHandler"></EventDetail>
               </div>
               `
})
export class Events {


    events: Event[] = [];
    constructor(private eventService: EventService) {
        this.update();
    }
    
    update(){
         this.eventService.getItems()
            .subscribe(
                events => this.events = events,
                error => console.log('Error: ', error)
            );
    }
    
    addItemHandler = () => {
        const self = this;
        const newItem = new Event();
        self.eventService.createItem(newItem)
            .subscribe(
                r => console.log(r),
                error => console.log('Error: ', error),
                () => {
                     self.update();
                }
            );
    }
    removeItemHandler = (id:number) =>{
        const self = this;
        self.eventService.deleteItem(id)
            .subscribe(
                r => console.log(r),
                error => console.log('Error: ', error),
                () => {
                     self.update();
                }
            )
    }
    
}
