import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import { Session, UserAuth } from './session';
import { Routes } from '../app';

@Component({
    selector: 'login',
    providers: [],
    directives: [
        ...FORM_DIRECTIVES,
    ],
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./login.html')
})
export class Login {

    email: string = '';
    model: {
        "email": string,
        'password': string
    } = { 'email': 'Simon.Gausmann@Gausmann-Media.de', 
        'password':'123456'
    }
    isLoading: boolean = false;
    responseErrorMessage: { _body: string } = null
    session:Session = null;
    
    constructor(private http: Http, private router:Router) {
        this.session = Session.getInstance()
        if (this.session.userAuth) {
                    this.isLoading = true;
                    this.afterLogin();
            }
    }

    afterLogin (){
        this.router.navigateByUrl(Routes.events.path);        
    }
    
    doLogin() {
        this.responseErrorMessage =  null
        this.isLoading = true;
 
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('/api/Customers/login', JSON.stringify(this.model), { headers: headers })
            .map(res => res.json())
            .subscribe((token:UserAuth) => {
                this.isLoading = false;
                this.session.setToken(token);
                this.afterLogin();
                
                }, e => {
                    this.session.clearToken();
                    this.isLoading = false;
                    this.responseErrorMessage = e;
                }); 
    
    }

}
