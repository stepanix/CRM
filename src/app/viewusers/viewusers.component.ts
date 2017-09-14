import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {UserServiceApi,TenantServiceApi} from '../shared/shared';
import {GlobalApi} from '../shared/global-functions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss'],
  animations: [routerTransition()]
})
export class ViewUsersComponent implements OnInit {

  users:any[] = [];
  tenants : any[] = [];
 
  displayDialog : boolean = false;
  UserModel : any = {};
  userId : any = "";
  UserDtoIn : any = {};
  busy: Subscription;

   constructor(private globalApi : GlobalApi,
    private userServiceApi:UserServiceApi,
    private tenantServiceApi:TenantServiceApi) {
      this.refreshVariables();
   }

  refreshVariables(){
      this.userId="";
      this.UserModel.SelectedTenant = -1;
      this.UserModel.FirstName = "";
      this.UserModel.Surname = "";
      this.UserModel.Email = "";
      this.UserModel.SelectedRole = "";
      this.UserModel.IsActive = false;
  }

  ngOnInit() {
    this.listUsersApi();
    this.listTenantsApi();
  }

  

  isUserInputVariablesInValid() : boolean{
    if(this.userId === ""){
      if(this.globalApi.validateEmail(this.UserModel.Email) ===true
        && this.UserModel.SelectedTenant !== 1
        && this.UserModel.FirstName !== ""
        && this.UserModel.Surname !== ""
        && this.UserModel.Email !== ""
        && this.UserModel.SelectedRole !== "") {
          return false;
        }else{
          return true;
        }
    }else{
      return false;
    }
  }

  editUser(uservar){
     this.showDialog();
     this.getUserApi(uservar);
  }

  showDialog() {
    this.refreshVariables();
    this.displayDialog = true;
  }

  hideDialog(){
    this.refreshVariables();
    this.displayDialog = false;
  }

  saveUser(){
    if(this.userId===""){
      this.saveUserApi();
    }else{
      this.updateUserApi();
    }
  }

  setUserDtoInput(){
      this.UserDtoIn = {
          id: this.userId,
          tenantId: this.UserModel.SelectedTenant,
          email : this.UserModel.Email,
          userName : this.UserModel.Email,
          firstName : this.UserModel.FirstName,
          surname : this.UserModel.Surname,
          role : this.UserModel.SelectedRole,
          password : "Test!2345",
          confirmPassword : "Test!2345",
          isActive : this.UserModel.IsActive
      };
  }

  getUserApi(uservar){
    this.userId = uservar.id;
    this.busy=this.userServiceApi.getUser(this.userId)
    .subscribe(
        res => {
            this.userId =  res.id;
            this.UserModel.SelectedTenant = res.tenantId;
            this.UserModel.FirstName = res.firstName;
            this.UserModel.Surname = res.surname;
            this.UserModel.Email = res.email;
            this.UserModel.SelectedRole = "";
            this.UserModel.IsActive = res.isActive;
        },err => {
          console.log(err.message);
          return;
      });
  }

  saveUserApi() {
    this.setUserDtoInput();
    this.busy=this.userServiceApi.addUser(this.UserDtoIn)
    .subscribe(
        res => {
          this.hideDialog();
          this.listUsersApi();
        },err => {
          console.log(err.message);
          return;
      });
  }

  updateUserApi() {
      this.setUserDtoInput();
      this.busy=this.userServiceApi.updateUser(this.UserDtoIn)
      .subscribe(
          res => {
            this.hideDialog();
            this.listUsersApi();
          },err => {
            console.log(err.message);
            return;
        });
   }

   listUsersApi() {
      this.users = [];
      this.busy=this.userServiceApi.getUsers()
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

  listTenantsApi() {
      this.tenants = [];
      this.busy=this.tenantServiceApi.getTenants()
      .subscribe(
          res => {
            this.tenants = res;
          },err => {
            console.log(err.message);
            return;
        });
  }


}
