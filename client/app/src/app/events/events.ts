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
               
               <button class="btn btn-default" (click)="addItem()"> add </button>
               
               <div *ngFor="#item of events" class="row">
                
                <button (click)="removeItem(item.id)" class="btn btn-default pull-left">x</button>
                <EventDetail [item]="item">huhu</EventDetail>
                
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
                error => console.error('Error: ' + error)
            );
    }
    addItem (){
        const newItem = new Event();
        this.eventService.createItem(newItem)
            .subscribe(
                r => console.log(r),
                error => console.log('Error: ' + JSON.stringify(error)),
                () => {
                     this.update();
                }
            );
    }
    removeItem(id:number){
        this.eventService.deleteItem(id)
            .subscribe(
                r => console.log(r),
                error => console.log('Error: ' + JSON.stringify(error)),
                () => {
                     this.update();
                }
            )
    }
    
}
