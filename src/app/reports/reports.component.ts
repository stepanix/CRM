import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { PlaceServiceApi, ScheduleServiceApi, UserServiceApi, FormServiceApi } from '../shared/shared';
import { DataGridModule, PanelModule } from 'primeng/primeng';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {

  forms: any[] = [];
  busy: Subscription;
  schedulesreports: any[] = [];
  salesreports: any[] = [];

  constructor(private formServiceApi: FormServiceApi) { }

  ngOnInit() {
    this.listFormsApi();
    this.listSchedulesApi();
    this.listSalesApi();
  }

  listFormsApi() {
    this.forms = [];
    this.busy = this.formServiceApi.getForms()
      .subscribe(
      res => {
        this.forms = res;
      }, err => {
        console.log(err);
        return;
      });
  }

  listSchedulesApi() {
    this.schedulesreports = [{ title: "By Place" },
    { title: "By Representative" }
    ];
  }

  listSalesApi() {
    this.salesreports = [
      { title: "By Product",type : "product" },
      { title: "By Place", type : "place" },
      { title: "By Representative" , type : "rep" }
    ];
  }

}
