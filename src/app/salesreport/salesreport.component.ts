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
  barchartData: number[] = [];
  barchartLabels: any[] = [];
  tempLabelData: any[] = [];

  extractedTempData: any[] = [];
  salesByProducts: any[] = [];
  totalSalesPerDate: any[] = [];

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

  updateBarChartData(label, newValue: number) {
    let itemModel: any = this.tempLabelData.find(item => item.label === label)
    itemModel.value = parseFloat(itemModel.value) + newValue;
  }

  updateTotalProductOrderValue(id: number, newValue: number) {
    let itemModel: any = this.salesByProducts.find(item => item.id === id)
    itemModel.totalSold = parseFloat(itemModel.totalSold) + newValue;
  }

  updateTotalSoldPerDate(productId: number, name: string, date: any, newValue: number) {
    let itemModel: any = this.totalSalesPerDate.find(item => item.date === date && item.id === productId)
    if (itemModel === undefined) {
      this.totalSalesPerDate.push({
        id: productId,
        name: name,
        date: date,
        value: newValue
      });
    } else {
      itemModel.value = parseFloat(itemModel.value) + newValue;
    }
  }

  listSalesReportValues() {
    let tempReportData: any[] = [];
    let sum: number = 0;
    let labelItem: string = "";
    let valueItem: number = 0;
    this.barchartData = [];
    this.barchartLabels = [];
    this.salesByProducts = [];
    this.totalSalesPerDate = [];

    this.busy = this.orderServiceApi
      .getOrderItemsDateRange(this.dateFrom, this.dateTo)
      .subscribe(
      res => {
        if (res.length > 0) {
          for (var i = 0; i < res.length; i++) {
            labelItem = moment(res[i].addedDate).format("MMM Do");
            if (this.tempLabelData.find(item => item.label === labelItem) === undefined) {
              //add new item
              this.tempLabelData.push({
                label: labelItem,
                value: res[i].amount
              });
            } else {
              //update existing item
              this.updateBarChartData(labelItem, parseFloat(res[i].amount));
            }

            if (this.salesByProducts.find(item => item.id === parseInt(res[i].product.id)) === undefined) {
              this.salesByProducts.push({
                id: res[i].product.id,
                name: res[i].product.name,
                totalSold: parseFloat(res[i].amount)
              });
            } else {
              this.updateTotalProductOrderValue(parseInt(res[i].product.id), parseFloat(res[i].amount))
            }
            if (this.totalSalesPerDate.find(item => item.date === labelItem && item.id === parseInt(res[i].product.id)) === undefined) {
              this.totalSalesPerDate.push({
                id: parseInt(res[i].product.id),
                name: res[i].product.name,
                date: labelItem,
                value: parseFloat(res[i].amount)
              });
            } else {
              this.updateTotalSoldPerDate(parseInt(res[i].product.id), res[i].product.name, labelItem, parseFloat(res[i].amount));
            }
          }

          console.log("sales by product", this.salesByProducts);
          console.log("sales per date", this.totalSalesPerDate);
        }

        for (let x = 0; x < this.tempLabelData.length; x++) {
          this.barchartLabels.push(this.tempLabelData[x].label);
          this.barchartData.push(this.tempLabelData[x].value);
        }

        this.data = {
          labels: this.barchartLabels,
          datasets: [
            {
              label: 'Sales Report by Product',
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
