import { Component, OnInit } from '@angular/core';
import {TenantServiceApi} from '../shared/shared';
import { routerTransition } from '../router.animations';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {GlobalApi} from '../shared/global-functions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-viewtenants',
  templateUrl: './viewtenants.component.html',
  styleUrls: ['./viewtenants.component.scss'],
  animations: [routerTransition()]
})
export class ViewTenantsComponent implements OnInit {

  tenants : any[] = [];
  displayDialog : boolean = false;
  TenantModel : any = {};
  tenantId : any = "0";
  busy: Subscription;

  constructor(private globalApi:GlobalApi,private tenantServiceApi:TenantServiceApi) {
      this.refreshVariables();
  }

  refreshVariables() {
      this.tenantId ="0";
      this.TenantModel.Name = "";
      this.TenantModel.Address = "";
      this.TenantModel.Phone = "";
      this.TenantModel.Email = "";
      this.TenantModel.WebSite = "";
      this.TenantModel.ContactPerson = "";
      this.TenantModel.ContactNumber = "";
  }

  ngOnInit() {
    this.listTenantApi();
  }

  isEmailValid(){
    if(this.TenantModel.Email !== "" && this.TenantModel.Email !==null) {
       return this.globalApi.validateEmail(this.TenantModel.Email);       
    }else{
        return true;
    }
  }

  isUrlValid() {
    if(this.TenantModel.WebSite !== "" && this.TenantModel.WebSite !==null) {
        return this.globalApi.validateUrl(this.TenantModel.WebSite);
    }else{
        return true;
    }
  }

  showDialog() {
    this.refreshVariables();
    this.displayDialog = true;
  }

  hideDialog(){
    this.refreshVariables();
    this.displayDialog = false;
  }

  saveTenant(){
      if(this.tenantId==="0"){
        this.saveTenantApi();
      }else{
        this.updateTenantApi();
      }
  }

  editTenant(tenantvar) {
    this.showDialog();
    this.tenantId = tenantvar.id;
    this.TenantModel.Name = tenantvar.name;
    this.TenantModel.Address = tenantvar.address;
    this.TenantModel.Phone = tenantvar.phone;
    this.TenantModel.Email = tenantvar.email;
    this.TenantModel.WebSite = tenantvar.webSite;
    this.TenantModel.ContactPerson = tenantvar.contactPerson;
    this.TenantModel.ContactNumber = tenantvar.contactNumber;
 }

    saveTenantApi() {
      let TenantDtoIn = {
        id: 1,
        name: this.TenantModel.Name,
        address : this.TenantModel.Address,
        phone : this.TenantModel.Phone,
        email : this.TenantModel.Email,
        webSite : this.TenantModel.WebSite,
        contactPerson : this.TenantModel.ContactPerson,
        contactNumber : this.TenantModel.ContactNumber
      };
      this.busy=this.tenantServiceApi.addTenant(TenantDtoIn)
      .subscribe(
          res => {
            this.hideDialog();
            this.listTenantApi();
          },err => {
            console.log(err);
            return;
        });
    }

    updateTenantApi() {
      let TenantDtoIn = {
        id: this.tenantId,
        name: this.TenantModel.Name,
        address : this.TenantModel.Address,
        phone : this.TenantModel.Phone,
        email : this.TenantModel.Email,
        webSite : this.TenantModel.WebSite,
        contactPerson : this.TenantModel.ContactPerson,
        contactNumber : this.TenantModel.ContactNumber
      };
      this.busy=this.tenantServiceApi.updateTenant(TenantDtoIn)
      .subscribe(
          res => {
            this.hideDialog();
            this.listTenantApi();
          },err => {
            console.log(err);
            return;
        });
    }

    listTenantApi() {
      this.tenants = [];
      this.busy=this.tenantServiceApi.getTenants()
      .subscribe(
          res => {
            this.tenants = res;
          },err => {
            console.log(err);
            return;
        });
    }

    deleteTenantApi(tenantvar) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.busy=this.tenantServiceApi.deleteTenant(tenantvar.id)
          .subscribe(
              res => {
                this.listTenantApi();
              },err => {
                console.log(err);
                return;
            });
      }else{
         return;
      }
  }

}
