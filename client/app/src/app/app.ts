/*
 * Angular 2 decorators and services
 */
import {Component, NgZone} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';


import {Home} from './home/home';
import {Events} from './events/events';
import {Login} from './user/login';
import {Session, UserAuth} from './user/session';


export const Routes = {
    index: { path: '/', component: Home, name: 'Index' },
    home: { path: '/home', component: Home, name: 'Home' },
    login: { path: '/login', component: Login, name: 'Login' },
    events: { path: '/events', component: Events, name: 'Events' },
    all: { path: '/**', redirectTo: ['Index'] }
};

@Component({
    selector: 'app',
    providers: [...FORM_PROVIDERS],
    directives: [...ROUTER_DIRECTIVES],
    pipes: [],
    styles: [require('./layout/layout.css')],
    template: require('./layout/layout.html')
})
@RouteConfig(Object.keys(Routes).map(key => Routes[key]))
export class App {
    AppName = 'Events';
    url = 'https://twitter.com/AngularClass';

    userAuth: UserAuth = null;
    zone: NgZone;
    session: Session;
    constructor() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.session = Session.getInstance();
        this.session.stream.subscribe(userAuth => {
            this.zone.run(() => this.userAuth = userAuth);
        });
        this.session.tryRestore();
    }
    logOff() {
        // todo make this nice
        if (window.confirm("Sure ?")) {
            this.session.clearToken();
        }

    }
}
