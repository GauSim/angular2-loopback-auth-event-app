import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { Session, UserAuth } from '../user/session';
import { Event } from './event'

@Injectable()
export class EventService {
    
    
    _http:Http;
    headers:Headers = null;
    userId:string = null;
    token:string = null;
    
    constructor(_http:Http) {
        
        this._http = _http;
        
        
        const session = Session.getInstance();
        if (session.userAuth) {
            this.userId = session.userAuth.userId;
            this.token = session.userAuth.id;
        }

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('X-Access-Token', this.token)

        this.events = this._http.get(`api/Customers/${this.userId}/events`, { headers: this.headers })
            .map(res => res.json())
  }
  
  getItems(){
     return this.events;
  }
  createItem(item:Event){
      item.customerId = this.userId;
     return this._http.post(`api/Customers/${this.userId}/events`,JSON.stringify(item), { headers: this.headers }).map(res => res.json())
  }
  deleteItem(id:number){
      return this._http.delete(`api/Customers/${this.userId}/events`,, { headers: this.headers }).map(res => res.json())
  }
  
  
}