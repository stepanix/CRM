import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {FormServiceApi} from '../shared/shared';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'app-viewforms',
  templateUrl: './viewforms.component.html',
  styleUrls: ['./viewforms.component.scss'],
  animations: [routerTransition()]
})
export class ViewFormsComponent implements OnInit {

  forms : any[] = [];

  constructor(private formServiceApi:FormServiceApi) { 

  }

  ngOnInit() {
    this.listFormsApi();
  }

  listFormsApi(){
    this.forms = [];
    this.formServiceApi.getForms()
    .subscribe(
         res => {
           this.forms = res;
         },err => {
           console.log(err.message);
           return;
       });
  }

  deleteFormApi(formvar){
        if (window.confirm('Are you sure you want to delete?')) {
          this.formServiceApi.deleteForm(formvar.id)
          .subscribe(
              res => {
                this.listFormsApi();
              },err => {
                console.log(err.message);
                return;
            });
      }else{
        return;
      }
  }

}
