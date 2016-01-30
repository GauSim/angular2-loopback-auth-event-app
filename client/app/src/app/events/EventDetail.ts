import { Directive, Component, ElementRef, Renderer, Input } from 'angular2/core';
import { Event } from './models/Event';
import { EventService } from './services/EventService';

import { DatePicker } from '../DatePicker/DatePicker';


@Component({
    selector: 'EventDetail',
    providers: [],
    directives: [DatePicker],
    pipes: [],
    styles: [],
    template: require('./templates/EventDetail.html')
})
export class EventDetail {

    @Input() item: Event;
    @Input('update-list') updateList: () => void;

    constructor(private eventService: EventService,
        private element: ElementRef,
        private renderer: Renderer) {
    }

    removeItem(id: number) {
        const userInput = window.confirm('Sure ?');
        if (true) {
            this.eventService.deleteItem(id)
                .subscribe(
                result => console.log(result),
                error => console.log('Error: ', error),
                () => {
                    this.updateList();
                }
                )
        }
    }

    ngOnInit() {

    }
}
