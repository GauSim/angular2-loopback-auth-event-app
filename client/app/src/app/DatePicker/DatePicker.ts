/// <reference path="../../../typings/moment/moment-node.d.ts" />

import { Directive, Component, ElementRef, Renderer, Input, Output, EventEmitter } from 'angular2/core';
import { Control, Validator } from 'angular2/common';


import * as _moment from 'moment';
const moment: moment.MomentStatic = <any>_moment;

moment.locale('de');


class MyValidator implements Validator {
    validate(c: Control): { [key: string]: any } {
        return { "custom": true };
    }
}

@Component({
    selector: 'DatePicker',
    providers: [moment],
    directives: [],
    pipes: [],
    styles: [],
    template: require('./DatePicker.html')
})
export class DatePicker {

    @Input('input-date') inputDate: Date;
    @Output('on-select') onSelect = new EventEmitter<Date>();
    @Input('show-calender') showCalender: boolean;

    UI = {
        weekDays: moment.weekdaysShort()
    }


    outputDate: moment.Moment = null;
    days: moment.Moment[] = [];
    selected: moment.Moment = null;
    textBoxInput = new Control(null, MyValidator);

    constructor(private element: ElementRef,
        private renderer: Renderer) {

        this.selected = moment(this.inputDate);
        this.outputDate = moment(this.inputDate);
        this.renderCalender();
        this.textBoxInput.valueChanges
            .map((val: string) => { return val.trim() })
            .debounceTime(500)
            .subscribe((value: string) => {

                // console.log(this.textBoxInput);

                if (!value || value.length != 10) {
                    return;
                }

                let parseDate = moment(value, "DD.MM.YYYY");

                if (!parseDate.isValid()) {
                    parseDate = moment(value, "DD-MM-YYYY");
                }

                if (parseDate.isValid()) {
                    this.selected = this.outputDate = this._cutTime(parseDate);
                    this.onSelect.emit(this.outputDate.toDate());
                    this.renderCalender();
                } else {
                    this.outputDate = null;
                    this.renderCalender();
                }

            });

    }

    toggleCalender() {
        this.showCalender = !this.showCalender;
    }

    renderCalender() {
        const start = moment().set('year', this.selected.year()).set('month', this.selected.month()).set('date', 1);
        const end = moment().set('year', this.selected.year()).set('month', this.selected.month()).set('date', start.daysInMonth() + 1);
        const runner = start;

        this.days = [];
        
        // make sure day algin with week days, push empty elements in front 
        const dayInWeek = start.weekday() + 1;
        if (dayInWeek < 7) {
            for (let i = 0; i < dayInWeek; i++) {
                this.days.push(null);
            }
        }

        while (runner < end) {
            const item = this._cutTime(runner);
            this.days.push(item)
            runner.add(1, 'days');
        }
    }

    _cutTime(date) {
        return moment(date)
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .set('millisecond', 0);
    }

    setMonth(m: number) {
        this.selected.month(this.selected.month() + m);
        this.renderCalender();
    }

    setYear(m: number) {
        this.selected.year(this.selected.year() + m);
        this.renderCalender();
    }

    setOutputDate(d: moment.Moment) {
        this.outputDate = d;
        this.onSelect.emit(this.outputDate.toDate());
    }

    ngOnInit() {
        this.selected = moment(this.inputDate);
        this.outputDate = moment(this.inputDate);
        this.renderCalender();
    }
}
