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
  
  dateFrom: any = "";
  dateTo: any = "";

  data: any;
  barchartData : number[] = [];
  barchartLabels : any[] = [];
  tempLabelData : any[] = [];

  extractedTempData: any[] = [];

  constructor(private orderServiceApi: OrderItemServiceApi,
    private router: Router,
    private route: ActivatedRoute) {
    this.dateFrom = moment("2016-12-12").format("YYYY-MM-DD");
    this.dateTo = moment().format("YYYY-MM-DD");

    this.barchartData = [65, 59, 80, 81, 56, 55, 40];

    this.data = {
      labels: ['Jan 1', 'Jan 5', 'Jan 15', 'Feb 12'],
      datasets: [
        {
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.barchartData
        }
      ]
    }
  }

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
    this.listSalesReportValues();
  }

  // getRollingValue(label:string) : number{
  //  let valueModel =  this.tempLabelData.find(item => item.label === label);
  //  return parseFloat(valueModel.value);
  // }

  updateBarChartData(label,newValue:number) {
   let itemModel : any =  this.tempLabelData.find(item => item.label === label)
   itemModel.value = parseFloat(itemModel.value) + newValue;
   //console.log("item index",index);
    //let index: any = this.tempLabelData.indexOf(itemData);
    //console.log("index",index);
    // if (index !== -1) {
    //   this.tempLabelData[index].value = newValue;
    // }
  }

  listSalesReportValues() {
    let tempReportData: any[] = [];
    let sum: number = 0;    
    let labelItem :string = "";
    let valueItem : number = 0;
    this.barchartData = [];
    this.barchartLabels = [];

    this.busy = this.orderServiceApi.getOrderItemsDateRange(this.dateFrom, this.dateTo)
      .subscribe(
      res => {
        if(res.length > 0) {
          for (var i = 0; i < res.length; i++) {
            labelItem = moment(res[i].addedDate).format("MMM Do");
            if(this.tempLabelData.find(item => item.label === labelItem)===undefined) {
               //add new item
               this.tempLabelData.push({
                  label : labelItem,
                  value : res[i].amount
               });
            }else{
               //update existing item
               this.updateBarChartData(labelItem,parseFloat(res[i].amount));
            }
          }
        }
        
        for(let x=0;x<this.tempLabelData.length;x++){
          this.barchartLabels.push(this.tempLabelData[x].label);
          this.barchartData.push(this.tempLabelData[x].value);
        }
                
        this.data = {
          labels: this.barchartLabels,
          datasets: [
            {
              label: 'Sales Report',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.barchartData
            }
          ]
        }
        //console.log("chart values",this.tempLabelData);
        //console.log("labels",this.tempLabelData);
        //console.log("valueitem",valueItem);
        // this.barChartData.push({
        //   data : 
        // });
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
