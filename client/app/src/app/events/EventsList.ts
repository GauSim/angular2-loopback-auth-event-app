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
            
                <EventCreate [update-list]="updateHandler"></EventCreate>
                              
               <ul class="list-group">
                    <li class="list-group-item" *ngFor="#item of events">
                        <EventDetail [item]="item" [update-list]="updateHandler"></EventDetail>
                    </li>
               </ul>
               `
})
export class EventsList {


    events: Event[] = [];
    constructor(private eventService: EventService) {
        this.update();
    }

    update() {
        this.eventService.getItems()
            .subscribe(
            (events: Event[]) => {
                this.events = events;
            },
            error => console.log('Error: ', error)
            );
    }

    updateHandler = () => {
        const self = this;
        self.update();
    }
}
