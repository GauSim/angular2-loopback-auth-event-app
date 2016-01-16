import { Directive, Component, ElementRef, Renderer, Input } from 'angular2/core';
import { Event } from './models/Event';
import { EventService } from './services/EventService';


@Component({
    selector: 'EventDetail',
    providers: [],
    directives: [],
    pipes: [],
    styles: [],
    template: `
        <div>
            <button (click)="removeItem(item.id)" class="btn btn-default">x</button>
            <b> {{ item.date | date }} </b> -
            {{ item.name }}
        </div>
        `
})
export class EventDetail {

    @Input() item: Event;
    @Input('update-list') updateList: () => void;

    constructor(private eventService: EventService,
        private element: ElementRef,
        private renderer: Renderer) {

        console.log(eventService);
    }

    removeItem(id: number) {
        this.eventService.deleteItem(id)
            .subscribe(
            result => console.log(result),
            error => console.log('Error: ', error),
            () => {
                this.updateList();
            }
            )
    }

    ngOnInit() {

    }
}
