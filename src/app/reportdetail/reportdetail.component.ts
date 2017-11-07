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


  barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  chartSum: any = {};
  chartAvg: any= {};
  chartMax: any= {};
  chartMin: any= {};
  chartData: any[]= [];
  chartAnswers : any[] = [];

  extractedTempData: any[] = [];

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
      { data: [71], label: 'Sum' },
      { data: [70.5], label: 'Avg' },
      { data: [72], label: 'max' },
      { data: [75], label: 'Min' },
      { data: [10], label: 'base' }
    ];
    let tempReportData: any[] = [];
    let formFieldsData: any[] = [];
    let sum: number = 0;

    this.busy = this.formValueServiceApi.getFormValues()
      .subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].formId == this.id) {
            tempReportData.push(
              JSON.parse(res[i].formFieldValues)
            );
          }
        }

        for (let i = 0; i < tempReportData.length; i++) {
          for (let j = 0; j < tempReportData[i].length; j++) {
            this.extractedTempData.push({
              question: tempReportData[i][j].question,
              questionTypeId: tempReportData[i][j].questionTypeId,
              answer: tempReportData[i][j].answer
            });
            sum = 0;
          }
        }
        
        for (let i = 0; i < this.extractedTempData.length; i++) {
          if (this.parseQuestionExists(this.extractedTempData[i].question.trim()) === false) {
            this.saveChartData(this.extractedTempData[i].question.trim(), this.parseAllAnswers(this.extractedTempData[i].question.trim()));
          }
        }

        for(let i= 0; i<this.chartData.length; i++){
          // this.barChartData.push({
          //    data: this.chartData[i].metrics.sum,
          //    label : "sum"                      
          // });
        }
        // this.barChartData = [
        //   { data: [71], label: 'Sum' },
        //   { data: [70.5], label: 'Avg' },
        //   { data: [72], label: 'max' },
        //   { data: [75], label: 'Min' },
        //   { data: [10], label: 'base' }
        // ];
        console.log("Chart Data",this.chartData);
      }, err => {
        console.log(err);
        return;
      });
  }

  parseAllAnswers(question): string {
    this.chartAnswers = [];
    let answerSum: number = 0;
    let avgSum: number = 0;
    let maxValue: number = 0;
    let minValue: number = 0;
    let answerArray: number[] = [];
    let itemAnswers = this.extractedTempData.filter(item => item.question === question);

    for (let x = 0; x < itemAnswers.length; x++) {
      answerSum += this.answerFieldValue(itemAnswers[x].answer, itemAnswers[x].questionTypeId)
      answerArray.push(this.answerFieldValue(itemAnswers[x].answer, itemAnswers[x].questionTypeId));
    }
    avgSum = answerSum / itemAnswers.length;
    maxValue = Math.max.apply(null, answerArray);
    minValue = Math.min.apply(null, answerArray);
    this.chartSum = {
      data : answerSum,
      label : 'Sum' 
    };
    this.chartAvg = {
      data : avgSum,
      label : 'Avg'       
    };
    this.chartMax = {
      data : maxValue,       
      label : 'Max'   
    };
    this.chartMin = {
      data : minValue,
      label : 'Min'
    };
    this.chartAnswers.push(
      this.chartSum,
      this.chartAvg,
      this.chartMax,
      this.chartMin
    );
    return JSON.stringify(this.chartAnswers);
  }

  parseQuestionExists(question): boolean {
    let itemModel = this.chartData.find(item => item.question === question);
    if (itemModel === undefined) {
      return false;
    } else {
      return true;
    }
  }

  saveChartData(question, itemData) {
    //check if label exists. if true, then update else add
    this.chartData.push({
      question: question,
      metrics: itemData
    });
    //console.log(JSON.stringify(this.barChartData));
  }

  showLog() {
    console.log(JSON.stringify(this.chartData));
  }

  answerFieldValue(formFieldValue, questionTypeId): number {
    if (questionTypeId !== "3") {
      return 1;
    }
    if (formFieldValue === undefined
      || formFieldValue === "undefined"
      || formFieldValue === "null"
      || formFieldValue === null
      || formFieldValue === ""
      || Number.isNaN(formFieldValue)) {
      return 0;
    }
    return parseFloat(formFieldValue);
  }

}
