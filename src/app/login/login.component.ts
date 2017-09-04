import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {LoginServiceApi} from '../shared/shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    username : string = "";
    password : string = "";

    constructor(public router: Router,private loginServiceApi:LoginServiceApi) {
        localStorage.removeItem('token');
    }

    ngOnInit() {
    }

    onLoggedin() {
        let loginData = 'username=' + this.username + '&password=' + this.password + '&grant_type=password';
        this.loginServiceApi.postLogin(loginData).subscribe(res => {
            localStorage.setItem('token', res.access_token);
            this.router.navigate(['/dashboard']);
         }, err => {
             alert("Sorry ! the username or password you entered is incorrect");           
         });        
    }

}
