import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import {DialogModule,DropdownModule,DataTableModule,SharedModule,ListboxModule,ScheduleModule} from 'primeng/primeng';
import {PlaceServiceApi,ScheduleServiceApi,UserServiceApi} from '../shared/shared';
import 'fullcalendar';



@Component({
   selector: 'app-schedule',
   templateUrl: './schedule.component.html',
   styleUrls: ['./schedule.component.scss'],
   animations: [routerTransition()]
})

export class ScheduleComponent implements OnInit {

  events : any[] =[];

  header: any;
  

  constructor(private placeServiceApi:PlaceServiceApi ,
              private scheduleServiceApi:ScheduleServiceApi,
              private userServiceApi : UserServiceApi) {

  }

  ngOnInit() {
    this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
    };
    
    this.events = [
      {
          "title": "All Day Event",
          "start": "2016-12-12"
      },
      {
          "title": "Long Event",
          "start": "2016-01-07",
          "end": "2016-01-10"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-09T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-16T16:00:00"
      },
      {
          "title": "Conference",
          "start": "2016-01-11",
          "end": "2016-01-13"
      }
  ];
  }

    listEventsApi(){
      this.events = [];
      this.scheduleServiceApi.getSchedules()
      .subscribe(
           res => {
            //  for(var i=0; i< res.length; i++){
            //    this.events.push({
            //      title: res[i].
            //    });
             
           },err => {
             console.log(err.message);
             return;
         });
    }

}
