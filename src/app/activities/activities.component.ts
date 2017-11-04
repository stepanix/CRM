import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {AutoCompleteModule} from 'primeng/primeng';
import {} from '@types/googlemaps';
import {PlaceServiceApi,UserServiceApi,ActivityServiceApi} from '../shared/shared';

import * as moment from 'moment';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [routerTransition()]
})

export class ActivitiesComponent implements OnInit {

  dateFrom: any="";
  dateTo: any="";
  displayDialog : boolean = false;

  dtoUserId : any = "";
  dtoPlaceId : any = "";
  dtoUserName : any = "";
  dtoPlaceName : any = "";

  selectedUser: any = {};
  selectedPlace : any = {};

  selectedDateFrom : any = "";
  selectedDateTo : any = "";

  users : any[] = [];
  places : any[] = [];
  filteredCachedUsers : any[] = [];
  filteredCachedPlaces : any[] = [];

  UserSelectedModel : boolean = false;
  PlaceSelectedModel : boolean = false;

  activities : any[] = [];
  

  selectedModule : string = "";
  
  constructor(private activityServiceApi : ActivityServiceApi,
    private placeServiceApi:PlaceServiceApi,
    private userServiceApi : UserServiceApi) {
       this.dtoUserId = localStorage.getItem('userid');
       this.dateFrom =  moment().format("YYYY-MM-DD");
       this.dateTo =  moment().format("YYYY-MM-DD");
       this.dtoPlaceId = 0;
       this.getActivityLog();
    }

    applyFiltersApi() {
      this.getActivityLog();
    }
        
    getActivityLog() {
       this.activities = [];
       this.activityServiceApi.getActivitiesSummary(this.dtoUserId,this.dateFrom,this.dateTo,this.dtoPlaceId)
       .subscribe(
           res => {
             for(var i=0; i<res.length;i++){
                 this.activities.push({
                   salesRep : res[i].user.firstName + " " + res[i].user.surname,
                   activity : res[i].activityLog,
                   place : res[i].place.name + "                 -   activity : " + res[i].activityLog,
                   address : res[i].place.streetAddress,
                   date :   moment(res[i].dateCreated).format("YYYY-MM-DD"),
                   time : moment(res[i].dateCreated).format("LT")
                 });
             }
           },err => {
             console.log(err);
             return;
         });
    }

    checkSetEmptyDateRange() {
         if(Date.parse(this.selectedDateFrom) > Date.parse(this.selectedDateTo)) {
             this.dateTo = this.selectedDateFrom;
             this.selectedDateTo = this.selectedDateFrom;
        }
        if(Date.parse(this.selectedDateFrom).toString()==="NaN" 
          || Date.parse(this.selectedDateTo).toString()==="NaN") {
            this.selectedDateFrom = moment().format("YYYY-MM-DD");
            this.selectedDateTo = moment().format("YYYY-MM-DD");
        }
    }

    isAppyButtonDisabled():boolean{
        if(this.selectedModule==="" ||
          (Date.parse(this.selectedDateFrom).toString()==="NaN"  || Date.parse(this.selectedDateTo).toString()==="NaN") 
          &&  (this.dtoPlaceId==="" && this.dtoUserId==="")){          
          return true;
        }else{
          return false;
        }
    }

    dateFromSelected(){
      this.selectedDateFrom = moment(this.dateFrom).format("YYYY-MM-DD") ;
    }

    dateToSelected(){
      this.selectedDateTo = moment(this.dateTo).format("YYYY-MM-DD");
    }

  ngOnInit() {
    this.listUsersApi();
    this.listPlacesApi();
  }

  handleUserChange(e){
     if(this.UserSelectedModel==false){
       this.dtoUserId="";
       this.dtoUserName = "";
       this.selectedUser = {};
     }
  }

  handlePlaceChange(){
    if(this.PlaceSelectedModel==false){
      this.dtoPlaceId="";
      this.dtoPlaceName = "";
      this.selectedPlace = {};
    }
  }

  addFilter(){
    this.displayDialog = false;
  }

  showDialog() {
    this.displayDialog = true;
    this.listUsersApi();
    this.listPlacesApi();
  }

  setSelectedUser(value){
     this.dtoUserId=value.id;
     this.dtoUserName = value.fullName;
     this.UserSelectedModel = true;
  }

  setSelectedPlace(value){
    this.dtoPlaceId=value.id;
    this.dtoPlaceName = value.name;
    this.PlaceSelectedModel = true;
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





  

}
