import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceServiceApi, ScheduleServiceApi, UserServiceApi, FormValueServiceApi } from '../shared/shared';
import { routerTransition } from '../router.animations';
import { DataGridModule, PanelModule } from 'primeng/primeng';

@Component({
  selector: 'app-reportdetail',
  templateUrl: './reportdetail.component.html',
  styleUrls: ['./reportdetail.component.scss'],
  animations: [routerTransition()]
})
export class ReportDetailComponent implements OnInit {

  id: any;
  type: any;
  reportData: any;
  busy: Subscription;
  reportHeader: any;
  barChartData: any[] = [];
  barChartLabels: string[] = ['min', 'max', 'avg', 'sum'];
  barChartType: string = 'bar';
  tempData: any[] = [];
  min: number = 0;
  max: number = 0;
  avg: number = 0;
  sum: number = 0;
  count: number = 0;
  qnumberCount: number = 0;

  constructor(private formValueServiceApi: FormValueServiceApi,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
    if (this.type === "form") {
      this.listFormValues();
    }
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  listFormValues() {
    this.barChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: '' }
    ];
    let tempReportData: any[] = [];
    let extractedTempData: any[] = [];
    this.busy = this.formValueServiceApi.getFormValues()
      .subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          //get data with respect to form id selected
          if (res[i].formId == this.id) {
            tempReportData.push({
              data: JSON.parse(res[i].formFieldValues)
            });
          }
        }
         //merge data
          for (let i = 0; i < tempReportData.length; i++) {
            for (let j = 0; j < tempReportData[i].data.length; j++) {
              extractedTempData.push({
                question: tempReportData[i].data[j].question,
                answer: tempReportData[i].data[j].answer,
                count : 0
              });
            }
          }
           for (let x = 0; x < extractedTempData.length; x++) {
            for (let y = 0; y < extractedTempData.length; y++) {
              if (extractedTempData[x].question === extractedTempData[y].question) {
                  
                 //console.log("question", extractedTempData[y].question , "answer", extractedTempData[x].answer, "count", extractedTempData[x].count +=1);
              }
            }
          }
        console.log("tempReportData", tempReportData);
        console.log("extractedTempData", extractedTempData);
      }, err => {
        console.log(err);
        return;
      });
  }

  parseQuestionType(qtype) {
    if (qtype === "3") {

    }
    return 0;
  }

  isFormFieldValueValid(formFieldValue): boolean {
    if (formFieldValue === undefined
      || formFieldValue === "undefined"
      || formFieldValue === "null"
      || formFieldValue === null
      || formFieldValue === "") {
      return false;
    }
    return true;
  }

}
