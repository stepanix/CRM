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
  formName : string = "";


  barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  chartSum: any = {};
  chartAvg: any= {};
  chartMax: any= {};
  chartMin: any= {};
  chartValues: any[]= [];
  chartAnswers : any[] = [];

  extractedTempData: any[] = [];

  constructor(private formValueServiceApi: FormValueServiceApi,
    private router: Router,
    private route: ActivatedRoute) { 

      this.barChartData = [
          { data: [0], label: 'Sum' },
          { data: [0], label: 'Avg' },
          { data: [0], label: 'max' },
          { data: [0], label: 'Min' }
        ];
    }

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
    let tempReportData: any[] = [];
    let formFieldsData: any[] = [];
    let sum: number = 0;

    this.busy = this.formValueServiceApi.getFormValues()
      .subscribe(
      res => {
        console.log("all reports",res);
        for (var i = 0; i < res.length; i++) {
          if (res[i].formId == this.id) {
            this.formName = res[i].form.title;
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
        let barChartValues = [];
        let barChartData2 = [];
        for(let i= 0; i<this.chartValues.length; i++) {
          for(let j=0; j < this.chartValues[i].metrics.length; j++){
            barChartValues.push({
              data:  this.chartValues[i].metrics[j].data,
              label : this.chartValues[i].metrics[j].label  
            }); 
          }               
          barChartData2.push({
             question : this.chartValues[i].question,
             chartValues : barChartValues
          });
          barChartValues = [];
        }
        this.barChartData = this.chartValues[2].metrics;
        // console.log("metric data",this.chartValues[2].metrics);
        // console.log("barChartData",this.barChartData);
      }, err => {
        console.log(err);
        return;
      });
  }

  parseAllAnswers(question) : any {
    let baseData : any = {};
    let baseDataArray : number[] = [];
    this.chartAnswers = [];
    let answerSum: number = 0;
    let answerSumArray: number[] = [];
    let avgSum: number = 0;
    let avgSumArray: number[] = [];
    let maxValue: number = 0;
    let maxValueArray: number[] = [];
    let minValue: number = 0;
    let minValueArray: number[] = [];
    let answerArray: number[] = [];
    let itemAnswers = this.extractedTempData.filter(item => item.question === question);

    for (let x = 0; x < itemAnswers.length; x++) {
      answerSum += this.answerFieldValue(itemAnswers[x].answer, itemAnswers[x].questionTypeId)
      answerArray.push(this.answerFieldValue(itemAnswers[x].answer, itemAnswers[x].questionTypeId));
    }
    avgSum = answerSum / itemAnswers.length;
    maxValue = Math.max.apply(null, answerArray);
    minValue = Math.min.apply(null, answerArray);
    answerSumArray.push(answerSum);
    avgSumArray.push(avgSum);
    maxValueArray.push(maxValue);
    minValueArray.push(minValue);
    baseDataArray.push(0);
    this.chartSum = {
      data : answerSumArray,
      label : 'Sum' 
    };
    this.chartAvg = {
      data : avgSumArray,
      label : 'Avg'       
    };
    this.chartMax = {
      data : maxValueArray,       
      label : 'Max'   
    };
    this.chartMin = {
      data : minValueArray,
      label : 'Min'
    };
    baseData = {
      data : baseDataArray,
      label : ''
    };
    this.chartAnswers.push(
      this.chartSum,
      this.chartAvg,
      this.chartMax,
      this.chartMin,
      baseData
    );
    return this.chartAnswers;
  }

  parseQuestionExists(question): boolean {
    let itemModel = this.chartValues.find(item => item.question === question);
    if (itemModel === undefined) {
      return false;
    } else {
      return true;
    }
  }

  saveChartData(question, itemData) {
    //check if label exists. if true, then update else add
    this.chartValues.push({
      question: question,
      metrics: itemData
    });
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
