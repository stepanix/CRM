import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Subscription } from 'rxjs';
import { ScheduleServiceApi } from '../shared/shared';
import {DialogModule,SharedModule,DataTableModule,ListboxModule} from 'primeng/primeng';

@Component({
  selector: 'app-reportscheduledetails',
  templateUrl: './reportscheduledetails.component.html',
  styleUrls: ['./reportscheduledetails.component.scss'],
  animations: [routerTransition()]
})
export class ReportScheduleDetailsComponent implements OnInit {

  busy: Subscription;
  doughnutChartType: string = 'doughnut';  

  chartData: number[] = [];
  chartLabels: string[] = [];
  chartTotal : number[] = [];
  chartLabelTotal : string[] = [];
  
  loaded : boolean = false;
  loaded2 : boolean = false;

  scheduleData: any[] = [];
  places : any[] = [];
  rawPlaceData : any[] = [];

  constructor(private scheduleServiceApi: ScheduleServiceApi) {   
  }

  ngOnInit() {
    this.listVisitsApi();
    this.listVisitsByPlaceApi();
  }
  
  listVisitsApi() {
    let visitedLabel = "";
    let missedLabel = "";
    let unScheduledLabel = "";
    let scheduledLabel = "";
    let visitedCount: number = 0;
    let missedCount: number = 0;
    let unScheduledCount: number = 0;
    let scheduledCount: number = 0;
    let doughnutChartLabels = [];
    let doughnutChartData = []
    this.scheduleData = [];

   this.scheduleServiceApi.getSchedules().subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].isVisited === true) {
            visitedCount += 1;
            visitedLabel = "Visits"
          }
          if (res[i].isMissed === true) {
            missedCount += 1;
            missedLabel = "Missed visits";
          }
          if (res[i].isUnScheduled === true) {
            unScheduledCount += 1;
            unScheduledLabel = "Unscheduled visits"
          }
          if (res[i].isScheduled === true) {
            scheduledCount += 1;
            scheduledLabel = "Scheduled visits";
          }
          this.scheduleData.push({
            visitedCount: { visitedCount, visitedLabel },
            missedCount: { missedCount, missedLabel },
            unScheduledCount: { unScheduledCount, unScheduledLabel },
            scheduledCount: { scheduledCount, scheduledLabel },
          });
        }

        for (let i = 0; i < this.scheduleData.length; i++) {

          if (this.scheduleData[i].visitedCount.visitedCount > 0) {
            doughnutChartLabels.push(this.scheduleData[i].visitedCount.visitedLabel);
            doughnutChartData.push(this.scheduleData[i].visitedCount.visitedCount);
          }

          if (this.scheduleData[i].missedCount.missedCount > 0) {
            doughnutChartLabels.push(this.scheduleData[i].missedCount.missedLabel);
            doughnutChartData.push(this.scheduleData[i].missedCount.missedCount);
          }

          if (this.scheduleData[i].unScheduledCount.unScheduledCount > 0) {
            doughnutChartLabels.push(this.scheduleData[i].unScheduledCount.unScheduledLabel);
            doughnutChartData.push(this.scheduleData[i].unScheduledCount.unScheduledCount);
          }

          if (this.scheduleData[i].scheduledCount.scheduledCount > 0) {
            doughnutChartLabels.push(this.scheduleData[i].scheduledCount.scheduledLabel);
           doughnutChartData.push(this.scheduleData[i].scheduledCount.scheduledCount);
          }         
        }

        this.chartLabels = doughnutChartLabels;
        this.chartData = doughnutChartData;
        this.loaded = true;
        
      }, err => {
        console.log(err);
        return;
      });
  }


  listVisitsByPlaceApi() {
    let visitedLabel = "";
    let missedLabel = "";
    let unScheduledLabel = "";
    let scheduledLabel = "";
    let visitedCount: number = 0;
    let missedCount: number = 0;
    let unScheduledCount: number = 0;
    let scheduledCount: number = 0;
    let doughnutChartLabels = [];
    let doughnutChartData = []
    this.scheduleData = [];

    this.scheduleServiceApi.getSchedules().subscribe(
      res => {
        console.log("visits by place",res);
        this.rawPlaceData = res;
        for(let i=0;i<res.length;i++){
          this.places.push({
             placeName : res[i].place.name,
             visits : this.parseTotalPlaceVisits(res[i].placeId),
             unscheduled : this.parseTotalUnScheduledVisits(res[i].placeId),
             scheduled : this.parseTotalScheduledVisits(res[i].placeId),
             scheduledVisited : this.parseTotalScheduledVisitedVisits(res[i].placeId),
             missed : this.parseTotalMissedVisits(res[i].placeId)
          });
        }
        for(let i=0; i< this.places.length; i++){
          this.chartLabelTotal.push(this.places[i].placeName);
          this.chartTotal.push(this.places[i].visits);
        }
        this.loaded2 = true;
        console.log("Place data",this.places);
      }, err => {
        console.log(err);
        return;
      });
  }

  parseTotalPlaceVisits(placeid) {   
    let itemPlace = this.rawPlaceData.filter(item => item.placeId === placeid && item.isVisited===true);   
    return itemPlace.length;
  }

  parseTotalScheduledVisits(placeid) {
    let itemPlace = this.rawPlaceData.filter(item => item.placeId === placeid  && item.isScheduled===true);
    return itemPlace.length;
  }

  parseTotalScheduledVisitedVisits(placeid) {
    let itemPlace = this.rawPlaceData.filter(item => item.placeId === placeid  && item.isScheduled===true && item.isVisited===true);
    return itemPlace.length;
  }

  parseTotalUnScheduledVisits(placeid) {
    let itemPlace = this.rawPlaceData.filter(item => item.placeId === placeid && item.isVisited===true && item.isUnScheduled===true);
    return itemPlace.length;
  }

  parseTotalMissedVisits(placeid) {
    let itemPlace = this.rawPlaceData.filter(item => item.placeId === placeid && item.isMissed===true);
    return itemPlace.length;
  }


}
