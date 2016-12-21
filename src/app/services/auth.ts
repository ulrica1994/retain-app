import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreHelper } from './store-helper';
import { Store } from '../store';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {
    JWT_KEY: string = 'retain_token';
    JWT: string = '';
    constructor(
        private router: Router,
        private storeHelper: StoreHelper,
        private store: Store,
        private api: ApiService
    ){
        const token = window.localStorage.getItem(this.JWT_KEY);
        if (token) {
            this.setJwt(token);
        }
    }
    setJwt(jwt: string) {
        this.JWT = jwt;
        window.localStorage.setItem(this.JWT_KEY,jwt);
        this.api.setHeaders({'Authorization':`Bearer ${jwt}`});
    }
    isAuthorized(): boolean {
        // this.JWT = window.localStorage.getItem(this.JWT_KEY);
        return Boolean(this.JWT);
    }
    canActivate(): boolean {
        const canActivate = this.isAuthorized();
        console.log(canActivate);
        this.onCanActivate(canActivate);
        return canActivate;
        
    }
    onCanActivate(canActivate: boolean) {
        if (!canActivate) {
            this.router.navigate(['','auth']);
        }
    }
    authenticate(path,credits): Observable<any> {
        return this.api.post(`/${path}`,credits)
        .do((res: any) => this.setJwt(res.token))
        .do((res: any) => this.storeHelper.update('user',res.data))
        .map((res: any)=> res.data)
    }
    signout() {
        window.localStorage.removeItem(this.JWT_KEY);
        this.JWT = '';
        this.store.purge();
        this.router.navigate(['','auth']); 
    }
}