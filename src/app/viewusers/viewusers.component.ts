import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {UserServiceApi} from '../shared/shared';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss'],
  animations: [routerTransition()]
})
export class ViewUsersComponent implements OnInit {

  users:any[] = [];
 
  displayDialog : boolean = false;
  UserModel : any = {};
  userId : any = "";

  constructor(private userServiceApi:UserServiceApi) { }

  ngOnInit() {
    this.listUsersApi()
  }

  listUsersApi() {
    this.users = [];
    this.userServiceApi.getUsers()
    .subscribe(
        res => {
         for(var i=0; i<res.length;i++){
           this.users.push({
             id : res[i].id,
             firstName : res[i].firstName,
             surname : res[i].surname,
             isActive : res[i].isActive,
             tenant : res[i].tenant.name
           });
         }
        },err => {
          console.log(err.message);
          return;
      });
}

}
