import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {PlaceServiceApi,ScheduleServiceApi,UserServiceApi,FormServiceApi} from '../shared/shared';
import {DataGridModule,PanelModule} from 'primeng/primeng';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {

  forms : any[] = [];
  busy: Subscription;

  constructor(private formServiceApi:FormServiceApi) { }

  ngOnInit() {
    this.listFormsApi();
  }

  listFormsApi(){
    this.forms = [];
    this.busy = this.formServiceApi.getForms()
      .subscribe(
      res => {
        this.forms =  res;
      }, err => {
        console.log(err);
        return;
      });
  }

  viewReport(){
    
  }

}
