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

  isScheduled : boolean = false;
  isVisited : boolean = false;
  isUnScheduled: boolean = false;
  isMissed : boolean = false;
  scheduleId : any ="";

  visited:boolean = false;
  scheduled:boolean = false;
  missed:boolean = false;
  unscheduled : boolean = false;
  

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
     this.listUsersApi();
     this.listPlacesApi();
  }

  refreshvariables() {
      this.ScheduleModel.visitDate = this.defaultDate;
      this.selectedTime = "";
      this.selectedUser.id = "";
      this.selectedPlace.id = "";
      this.dtoUserId = "";
      this.dtoPlaceId = "";
      this.scheduleId = "";
      this.visited = false;
      this.scheduled = false;
      this.missed = false;
      this.unscheduled = false;
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

   editEvent(e) {
    this.showScheduleDialog();
    this.scheduleId = e.calEvent.id;
    this.scheduleServiceApi.getSchedule(this.scheduleId)
    .subscribe(
         res => {
           console.log(moment(res.visitDate).format("YYYY/MM/DD"));
           let tempDate = moment(res.visitDate).format().toString();
           this.selectedDate = new Date(tempDate);
           this.selectedTime = res.visitTime;
           this.Note = res.visitNote;
           this.selectedUser = {
              id : res.user.id,
              fullName : res.user.firstName + " " + res.user.surname,
              firstName : res.user.firstName,
              surname : res.user.surname 
           }
           this.selectedPlace = {
              id: res.place.id,
              name: res.place.name,
              streetAddress: res.place.streetAddress
           }

         this.visited = res.isVisited;
         this.scheduled = res.isScheduled;
         this.missed = res.isMissed;
         this.unscheduled = res.isUnScheduled;

         this.setSelectedUser(this.selectedUser);
         this.setSelectedPlace(this.selectedPlace);
         },err => {
           console.log(err);
           return;
       });
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
          console.log(err);
          return;
      });
   }

   listPlacesApi(){
    this.places = [];
    this.placeServiceApi.getPlaces()
    .subscribe(
        res => {
            this.places = res;
        },err => {
          console.log(err);
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
             console.log(err);
             return;
         });
    }

    listEventsByStatusApi(){
      this.events = [];
      this.scheduleServiceApi.getSchedulesByStatus(this.isVisited,this.isScheduled,this.isUnScheduled,this.isMissed)
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
             console.log(err);
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
      this.refreshvariables();
      this.displayDialog = false;
    }

    saveScheduleApi() {
      let ScheduleDto = {
            id: 1,
            placeId: this.dtoPlaceId,
            userId: this.dtoUserId,
            visitDate: this.selectedDate,
            visitTime: this.selectedTime,
            visitNote: this.Note,
            isRecurring: this.Recurring,
            repeatCycle: this.Weeks,
            isVisited: false,
            isScheduled: true,
            isMissed : false,
            isUnScheduled: false,
            visitStatus : "New visit"
        };
        
        this.scheduleServiceApi.addSchedule(ScheduleDto)
        .subscribe(
            res => {
              this.hideDialog();
              this.listEventsApi();
              this.displayDialog = false;
            },err => {
              console.log(err);
              return;
          });
    }

    updatecheduleApi() {
       let ScheduleDto = {
            id: this.scheduleId,
            placeId: this.dtoPlaceId,
            userId: this.dtoUserId,
            visitDate: this.selectedDate,
            visitTime: this.selectedTime,
            visitNote: this.Note,
            isRecurring: this.Recurring,
            repeatCycle: this.Weeks,
            isVisited: this.visited,
            isScheduled: this.scheduled,
            isMissed : this.missed,
            isUnScheduled: this.unscheduled,
            visitStatus : "New visit"
        };
        
        this.scheduleServiceApi.updateSchedule(ScheduleDto)
        .subscribe(
            res => {
              this.hideDialog();
              this.listEventsApi();
              this.displayDialog = false;
            },err => {
              console.log(err);
              return;
          });
    }

    saveSchedule() {
        if(this.scheduleId===""){         
          this.saveScheduleApi();
        }else{
          this.updatecheduleApi();
        }
    }

    removeScheduleApi(){
         if (window.confirm('Are you sure you want to delete?')) {
            this.scheduleServiceApi.deleteSchedule(this.scheduleId)
            .subscribe(
                res => {
                  this.hideDialog();
                  this.listEventsApi();
                },err => {
                  console.log(err.message);
                  return;
              });
        }else{
          return;
        }
    }



}
