import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Session, UserAuth } from '../../user/Session';
import { Event } from '../models/Event';


@Injectable()
export class EventService {

    headers:Headers = null;
    userId:string = null;
    token:string = null;
    events:Observable<Event[]> = null;
    
    constructor(private _http:Http) {
        this._http = _http;
        
        const session = Session.getInstance();
        
        if (session.userAuth) {
            this.userId = session.userAuth.userId;
            this.token = session.userAuth.id;
        }
        
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('X-Access-Token', this.token);

        this.events = this._http.get(`api/customers/${this.userId}/events`, { headers: this.headers })
            .map(res => res.json())
            
  }
  
  getItems(){
     return this.events;
  }
  createItem(item:Event){
      item.customerId = parseInt(this.userId,0);
     return this._http.post(`api/customers/${this.userId}/events`,JSON.stringify(item), { headers: this.headers })
        .map(res => res.json());
  }
  deleteItem(id:number){
      return this._http.delete(`api/events/${id}`, { headers: this.headers })
        .map(res => res.json());
  }
}
