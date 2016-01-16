import {Directive, Component, ElementRef, Renderer, Input} from 'angular2/core';
import {Event} from './models/Event';
import { EventService } from './services/EventService';


import { DatePicker } from '../DatePicker/DatePicker';

@Component({
    selector: 'EventCreate',
    providers: [],
    directives: [
        DatePicker
    ],
    pipes: [],
    styles: [],
    template: require('./templates/EventCreate.html')
})
export class EventCreate {

    @Input() item: Event;
    @Input('update-list') updateList: () => void;

    isLoading: boolean = false;
    hideForm: boolean = true;

    constructor(private eventService: EventService,
        private element: ElementRef,
        private renderer: Renderer) {

        this.item = new Event();
    }

    toggelForm() {
        this.hideForm = !this.hideForm;
    }

    createItem(item: Event) {
        this.isLoading = true;
        this.eventService.createItem(this.item)
            .subscribe(
            result => console.log(result),
            error => console.log('Error: ', error),
            () => {
                this.isLoading = false;
                this.updateList();
            }
            );
    }
    ngOnInit() {

    }
}
