import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {RetailAuditFormServiceApi} from '../shared/shared';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'app-viewretailauditforms',
  templateUrl: './viewretailauditforms.component.html',
  styleUrls: ['./viewretailauditforms.component.scss'],
  animations: [routerTransition()]
})
export class ViewRetailAuditFormsComponent implements OnInit {

    retailAuditForms : any[] = [];

    constructor(private retailAuditFormServiceApi:RetailAuditFormServiceApi) { }

    ngOnInit() {
      this.listRetailAuditFormsApi();
    }

    listRetailAuditFormsApi(){
      this.retailAuditForms = [];
      this.retailAuditFormServiceApi.getRetailAuditForms()
      .subscribe(
           res => {
             this.retailAuditForms = res;
           },err => {
             console.log(err);
             return;
         });
    }

    deleteFormApi(formvar) {
        if (window.confirm('Are you sure you want to delete?')) {
          this.retailAuditFormServiceApi.deleteRetailAuditForm(formvar.id)
          .subscribe(
              res => {
                this.listRetailAuditFormsApi();
              },err => {
                console.log(err);
                return;
            });
      }else{
           return;
      }
   }

}
