import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {CanActivate} from 'angular2/router';


import { Session, UserAuth } from '../user/Session';
import { EventService } from './services/EventService'
import { Event } from './models/Event';
import { EventDetail } from './EventDetail';
import { EventCreate } from './EventCreate';

// check if we can rout to thei componet
@CanActivate((next, prev) => Session.getInstance().isAuthenticated())
@Component({
    selector: 'EventsIndex',
    providers: [],
    directives: [
        ...FORM_DIRECTIVES,
        EventDetail,
        EventCreate
    ],
    pipes: [],
    styles: [],
    template: ` <h1>Events</h1> 
               
               <EventCreate [on-create]="addItemHandler"></EventCreate>
               
               <div *ngFor="#item of events" class="row">
                    <EventDetail [item]="item" [on-remove]="removeItemHandler"></EventDetail>
               </div>
               `
})
export class EventsList {


    events: Event[] = [];
    constructor(private eventService: EventService) {
        this.update();
    }
    
    update(){
         this.eventService.getItems()
            .subscribe(
                events => this.events = events,
                e => console.log('Error: ', e)
            );
    }
    
    addItemHandler = () => {
        const self = this;
        const newItem = new Event();
        self.eventService.createItem(newItem)
            .subscribe(
                r => console.log(r),
                e => console.log('Error: ', e),
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
                e => console.log('Error: ', e),
                () => {
                     self.update();
                }
            )
    }
    
}
