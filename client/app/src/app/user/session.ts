import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

sessionStorage.clear();

export interface UserAuth {
    id: string;
    userId: string;
}

export class Session {

    userAuth: UserAuth = null;

    static instance: Session;
    static isCreating: Boolean = false;

    static storageKeys = {
        TOKEN: 'TOKEN',
        USERID: 'USERID'
    }

    stream: Subject<UserAuth> = null;

    constructor() {
        if (!Session.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }

        this.stream = new Subject();

    }

    static getInstance() {
        if (Session.instance == null) {
            Session.isCreating = true;
            Session.instance = new Session();
            Session.isCreating = false;

        }

        return Session.instance;
    }
    tryRestore() {
        const id = sessionStorage.getItem(Session.storageKeys.TOKEN);
        const userId = sessionStorage.getItem(Session.storageKeys.USERID);
        if (id && userId) {
            this.userAuth = { id: id, userId: userId };
            this.update();
            console.log('Session:Restore:DONE');
            return true;
        } else {
            console.log('Session:Restore:FAIL');
            return false;
        }
    }

    update() {
        this.stream.next(this.userAuth);
    }
    clearToken() {
        this.userAuth = null;
        sessionStorage.removeItem(Session.storageKeys.TOKEN);
        sessionStorage.removeItem(Session.storageKeys.USERID);
        this.update();
    }

    setToken(userAuth: UserAuth) {

        sessionStorage.setItem(Session.storageKeys.TOKEN, userAuth.id);
        sessionStorage.setItem(Session.storageKeys.USERID, userAuth.userId);
        this.userAuth = userAuth;
        this.update();
    }
    isAuthenticated(){
       return this.userAuth != null && this.userAuth.id;
    }
}