import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import {DialogModule,DropdownModule,DataTableModule,SharedModule,ListboxModule,ScheduleModule,AutoCompleteModule,CalendarModule} from 'primeng/primeng';
import {PlaceServiceApi,ScheduleServiceApi,UserServiceApi} from '../shared/shared';
import { DatepickerModule } from 'angular2-material-datepicker'


import 'fullcalendar';
import * as moment from 'moment';

@Component({
   selector: 'app-schedule',
   templateUrl: './schedule.component.html',
   styleUrls: ['./schedule.component.scss'],
   animations: [routerTransition()]
})

export class ScheduleComponent implements OnInit {

  events : any[] =[];
  users : any[] = [];
  places : any[] = [];
  filteredCachedUsers : any[] = [];
  filteredCachedPlaces : any[] =[];

  selectedUser: any = {};
  selectedPlace : any = {};
  selectedDate : any = "";
  selectedTime : any = null;
  
  Recurring : boolean = false;
  Weeks : any = 0;
  Note : any = "";

  dtoUserId = "";
  dtoPlaceId = "";

  header: any;

  ScheduleModel : any = {};
  displayDialog : boolean = false;
  
  startTime : any;
  

  defaultDate:string = moment().format('YYYY-MM-DD').toString();

  constructor(private placeServiceApi:PlaceServiceApi,
              private scheduleServiceApi:ScheduleServiceApi,
              private userServiceApi : UserServiceApi) {
          this.selectedUser.id = "";
          this.selectedPlace.id = "";
  }

  showScheduleDialog() {
     this.refreshvariables();
     this.displayDialog = true;
  }

  refreshvariables() {
      this.ScheduleModel.visitDate = this.defaultDate;
      this.selectedUser.id="";
      this.selectedPlace.id="";
      this.dtoUserId = "";
      this.dtoPlaceId = "";
  }


  ngOnInit() {
      this.header = {
         left: 'prev,next today',
         center: 'title',
         right: 'month,agendaWeek,agendaDay'
      };
      this.listEventsApi();
      this.listUsersApi();
      this.listPlacesApi();
   }

   handleEventClick(e){
     //alert(e.calEvent.id);
   }

   setSelectedUser(value){
     this.dtoUserId=value.id;
   }

   setSelectedPlace(value){
    this.dtoPlaceId=value.id;
  }

   searchUser(event) {
     let query = event.query;
     this.filteredCachedUsers = this.filterUsers(query, this.users);
   }

   filterUsers(query, allusers: any[]):any[] {
    let filtered : any[] = [];
    for(let i = 0; i < this.users.length; i++) {
        let user = allusers[i];
        if(user.fullName.toLowerCase().indexOf(query.toLowerCase()) == 0
          || user.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0
          || user.surname.toLowerCase().indexOf(query.toLowerCase()) == 0
        ) {
            filtered.push(user);
        }
    }
    return filtered;
  }

  searchPlace(event) {
    let query = event.query;
    this.filteredCachedPlaces = this.filterPlaces(query, this.places);
  }

  filterPlaces(query, allplaces: any[]):any[] {
   let filtered : any[] = [];
   for(let i = 0; i < this.places.length; i++) {
       let place = allplaces[i];
       if(place.name.toLowerCase().indexOf(query.toLowerCase()) == 0
         || place.streetAddress.toLowerCase().indexOf(query.toLowerCase()) == 0) {
           filtered.push(place);
       }
   }
   return filtered;
 }

   listUsersApi(){
    this.users = [];
    this.userServiceApi.getUsers()
    .subscribe(
        res => {
          for(var i=0; i<res.length;i++){
              this.users.push({
                id : res[i].id,
                fullName : res[i].firstName + " " + res[i].surname,
                firstName : res[i].firstName,
                surname : res[i].surname 
              });
          }
        },err => {
          console.log(err.message);
          return;
      });
   }

   listPlacesApi(){
    this.places = [];
    this.placeServiceApi.getPlaces()
    .subscribe(
        res => {
            this.places = res;
          //console.log(JSON.stringify(this.users));
        },err => {
          console.log(err.message);
          return;
      });
   }

    listEventsApi(){
      this.events = [];
      this.scheduleServiceApi.getSchedules()
      .subscribe(
           res => {
             for(var i=0; i< res.length; i++){
                this.events.push({
                    id:res[i].id,
                    title: res[i].place.name,
                    start: this.parseVisitDate(res[i].visitDate,res[i].visitTime)
                 });
              }
           },err => {
             console.log(err.message);
             return;
         });
    }

    parseVisitDate(visitDateVar,visitTimeVar){
       if(visitTimeVar===null){
          return visitDateVar;
       }else{
         var tempdate:string = visitDateVar;
         console.log(tempdate.replace("00:00:00",moment(visitTimeVar).format('HH:mm')));
         return tempdate.replace("00:00:00",moment(visitTimeVar).format('HH:mm'));
       }
    }

    hideDialog(){
      this.displayDialog = false;
    }

    saveScheduleApi() {
      let ScheduleDto = {
            placeId: this.dtoPlaceId,
            userId: this.dtoUserId,
            visitDate: this.selectedDate,
            visitTime: this.selectedTime,
            visitNote: this.Note,
            isRecurring: this.Recurring,
            repeatCycle: this.Weeks,
            isVisited: false,
            isScheduled: true
        };
        console.log(JSON.stringify(ScheduleDto));
        this.scheduleServiceApi.addSchedule(ScheduleDto)
        .subscribe(
            res => {
              this.refreshvariables();
              this.listEventsApi();
              this.displayDialog = false;
            },err => {
              console.log(err.message);
              return;
          });
    }



}
