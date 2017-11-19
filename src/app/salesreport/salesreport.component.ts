import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { PlaceServiceApi, ScheduleServiceApi, UserServiceApi, OrderItemServiceApi } from '../shared/shared';

import * as moment from 'moment';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.scss'],
  animations: [routerTransition()]
})
export class SalesReportComponent implements OnInit {

  busy: Subscription;
  type: string;
  id: any;
  reportData: any;
  reportHeader: any;
  barChartData: any[] = [];

  barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  dateFrom : any = "";
  dateTo : any = "";

  constructor(private orderServiceApi:OrderItemServiceApi, 
    private router: Router,
    private route: ActivatedRoute) { 
      this.dateFrom = moment("2016-12-12").format("YYYY-MM-DD");
      this.dateTo = moment().format("YYYY-MM-DD");
      this.barChartData = [
        { data: [0], label: 'Jan' }
      ];
    }

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  listFormValues() {    
    let tempReportData: any[] = [];
    let formFieldsData: any[] = [];
    let sum: number = 0;

    this.busy = this.orderServiceApi.getOrderItemsDateRange(this.dateFrom,this.dateTo)
      .subscribe(
      res => {
        
        // for (var i = 0; i < res.length; i++) {
        //   if (res[i].formId == this.id) {
        //     this.formName = res[i].form.title;
        //     tempReportData.push(
        //       JSON.parse(res[i].formFieldValues)
        //     );
        //   }
        // }

        // for (let i = 0; i < tempReportData.length; i++) {
        //   for (let j = 0; j < tempReportData[i].length; j++) {
        //     this.extractedTempData.push({
        //       question: tempReportData[i][j].question,
        //       questionTypeId: tempReportData[i][j].questionTypeId,
        //       answer: tempReportData[i][j].answer
        //     });
        //     sum = 0;
        //   }
        // }
        
        // for (let i = 0; i < this.extractedTempData.length; i++) {
        //   if (this.parseQuestionExists(this.extractedTempData[i].question.trim()) === false) {
        //     this.saveChartData(this.extractedTempData[i].question.trim(), this.parseAllAnswers(this.extractedTempData[i].question.trim()));
        //   }
        // }
        // let barChartValues = [];
        // let barChartData2 = [];
        // for(let i= 0; i<this.chartValues.length; i++) {
        //   for(let j=0; j < this.chartValues[i].metrics.length; j++){
        //     barChartValues.push({
        //       data:  this.chartValues[i].metrics[j].data,
        //       label : this.chartValues[i].metrics[j].label  
        //     }); 
        //   }               
        //   barChartData2.push({
        //      question : this.chartValues[i].question,
        //      chartValues : barChartValues
        //   });
        //   barChartValues = [];
        // }
        // this.barChartData = this.chartValues[2].metrics;
       
      }, err => {
        console.log(err);
        return;
      });
  }

}
