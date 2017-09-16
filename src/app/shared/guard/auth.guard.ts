import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {

     }

     canActivate() {
        let token = String(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "null") {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }

    

}
