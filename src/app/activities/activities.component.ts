import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {AutoCompleteModule} from 'primeng/primeng';
import {} from '@types/googlemaps';
import {PlaceServiceApi,UserServiceApi,TimeMileageServiceApi} from '../shared/shared';
import {FormValueServiceApi,PhotoServiceApi,ScheduleServiceApi} from '../shared/shared';
import {NoteServiceApi,ProductAuditRetailServiceApi} from '../shared/shared';

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

  dtoUserId = "";
  dtoPlaceId = "";
  dtoUserName = "";
  dtoPlaceName = "";

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

  allActivities : any[] = [];
  formActivities : any[] = [];
  photoActivities : any[] = [];
  visitActivities : any[] = [];
  noteActivities : any[] = [];
  newPlaceActivities : any[] = [];
  auditActivities : any[] = [];

  selectedModule : string = "";
  
  constructor(
    private productAuditRetailServiceApi: ProductAuditRetailServiceApi,
    private noteServiceApi : NoteServiceApi,
    private scheduleServiceApi : ScheduleServiceApi,
    private photoServiceApi : PhotoServiceApi,
    private formValueServiceApi :FormValueServiceApi,
    private timeMileageServiceApi:TimeMileageServiceApi,
    private placeServiceApi:PlaceServiceApi,
    private userServiceApi : UserServiceApi) {
    }

    applyFiltersApi() {
       if(this.selectedModule==="audits") {
          this.listAuditRetailActivitiesApi();
       }else if(this.selectedModule==="visits") {
          this.listVisitsApi();
       }else if(this.selectedModule==="forms"){
          this.listFormValuesApi();
       }else if(this.selectedModule==="photos"){
          this.listPhotosApi();
       }else if(this.selectedModule==="notes"){
          this.listNotesApi();
       }else if(this.selectedModule==="newplaces"){
          this.listNewPlacesApi();
       }else if(this.selectedModule==="all"){
          this.listAllActivitiesApi();
       }
       for(var i=0;i<this.auditActivities.length;i++){
        this.allActivities.push({
            rep: this.auditActivities[i].user.firstName + " " + this.auditActivities[i].user.surname,
            place: this.auditActivities[i].place.name,
            description : this.auditActivities[i].form.name,
            picture : '',
            date: this.auditActivities[i].addedDate
         });
       }
       for(var i=0;i<this.visitActivities.length;i++){
        this.allActivities.push({
            rep: this.visitActivities[i].user.firstName + " " + this.visitActivities[i].user.surname,
            place: this.visitActivities[i].place.name,
            description : '',
            picture : '',
            date: this.visitActivities[i].addedDate
         });
       }
       for(var i=0;i<this.formActivities.length;i++){
          this.allActivities.push({
              rep: this.formActivities[i].user.firstName + " " + this.formActivities[i].user.surname,
              place: this.formActivities[i].place.name,
              description : this.formActivities[i].form.title,
              picture : '',
              date: this.formActivities[i].addedDate
          });
       }
       for(var i=0;i<this.photoActivities.length;i++){
          this.allActivities.push({
              rep: this.photoActivities[i].user.firstName + " " + this.photoActivities[i].user.surname,
              place: this.photoActivities[i].place.name,
              description : this.photoActivities[i].note,
              picture : this.photoActivities[i].pictureUrl,
              date: this.photoActivities[i].addedDate
          });
      }
      for(var i=0;i<this.noteActivities.length;i++){
          this.allActivities.push({
              rep: this.noteActivities[i].user.firstName + " " + this.noteActivities[i].user.surname,
              place: this.noteActivities[i].place.name,
              description : this.noteActivities[i].description,
              picture : '',
              date: this.noteActivities[i].addedDate
          });
       }

       for(var i=0;i<this.newPlaceActivities.length;i++){
          this.allActivities.push({
              rep: this.newPlaceActivities[i].user.firstName + " " + this.newPlaceActivities[i].user.surname,
              place: this.newPlaceActivities[i].place.name,
              description : 'No Activities',
              picture : '',
              date: this.newPlaceActivities[i].addedDate
          });
       }
    }

    listAllActivitiesApi(){
      this.listAuditRetailActivitiesApi();
      this.listVisitsApi();
      this.listFormValuesApi();
      this.listPhotosApi();
      this.listNotesApi();
      this.listNewPlacesApi();
    }

    listFormValuesApi(){
      this.checkSetEmptyDateRange();
      this.formActivities = [];
      if(this.dtoUserId ==="" && this.dtoPlaceId ==="") {
          this.formValueServiceApi.getFormValuesDateRange(this.selectedDateFrom,this.selectedDateTo)
          .subscribe(
              res => {
                 this.formActivities = res;
                 console.log(JSON.stringify(this.formActivities));
              },err => {
                 console.log(err);
                 return;
            });
      }

      if(this.dtoUserId !=="" && this.dtoPlaceId ==="") {
        this.formValueServiceApi.getFormValuesRep(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId)
        .subscribe(
            res => {           
              this.formActivities = res;
              console.log(JSON.stringify(this.formActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId ==="" && this.dtoPlaceId !=="") {
        this.formValueServiceApi.getFormValuesPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoPlaceId)
        .subscribe(
            res => {           
              this.formActivities = res;
              console.log(JSON.stringify(this.formActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId !=="" && this.dtoPlaceId !=="") {
          this.formValueServiceApi.getFormValuesRepAndPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId,this.dtoPlaceId)
          .subscribe(
              res => {
                this.formActivities = res;
                console.log(JSON.stringify(this.formActivities));
              },err => {
                console.log(err);
                return;
            });
       }
      
    }

    listPhotosApi(){
      this.checkSetEmptyDateRange();
      this.photoActivities = [];
      if(this.dtoUserId ==="" && this.dtoPlaceId ==="") {
          this.photoServiceApi.getPhotosDateRange(this.selectedDateFrom,this.selectedDateTo)
          .subscribe(
              res => {
                 this.photoActivities = res;
                 console.log(JSON.stringify(this.photoActivities));
              },err => {
                 console.log(err);
                 return;
            });
      }

      if(this.dtoUserId !=="" && this.dtoPlaceId ==="") {
        this.photoServiceApi.getPhotosRep(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId)
        .subscribe(
            res => {           
              this.photoActivities = res;
              console.log(JSON.stringify(this.photoActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId ==="" && this.dtoPlaceId !=="") {
        this.photoServiceApi.getPhotosPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoPlaceId)
        .subscribe(
            res => {           
              this.photoActivities = res;
              console.log(JSON.stringify(this.photoActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId !=="" && this.dtoPlaceId !=="") {
          this.photoServiceApi.getPhotosRepAndPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId,this.dtoPlaceId)
          .subscribe(
              res => {
                this.photoActivities = res;
                console.log(JSON.stringify(this.photoActivities));
              },err => {
                console.log(err);
                return;
            });
       }
      
    }

    

    listNotesApi(){
      this.checkSetEmptyDateRange();
      this.noteActivities = [];
      if(this.dtoUserId ==="" && this.dtoPlaceId ==="") {
          this.noteServiceApi.getNotesDateRange(this.selectedDateFrom,this.selectedDateTo)
          .subscribe(
              res => {
                 this.noteActivities = res;
                 console.log(JSON.stringify(this.noteActivities));
              },err => {
                 console.log(err);
                 return;
            });
      }

      if(this.dtoUserId !=="" && this.dtoPlaceId ==="") {
        this.noteServiceApi.getNotesRep(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId)
        .subscribe(
            res => {           
              this.noteActivities = res;
              console.log(JSON.stringify(this.noteActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId ==="" && this.dtoPlaceId !=="") {
        this.noteServiceApi.getNotesPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoPlaceId)
        .subscribe(
            res => {           
              this.noteActivities = res;
              console.log(JSON.stringify(this.noteActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId !=="" && this.dtoPlaceId !=="") {
          this.noteServiceApi.getNotesRepAndPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId,this.dtoPlaceId)
          .subscribe(
              res => {
                this.noteActivities = res;
                console.log(JSON.stringify(this.noteActivities));
              },err => {
                console.log(err);
                return;
            });
       }
      
    }

    listVisitsApi(){
      this.checkSetEmptyDateRange();
      this.visitActivities = [];
      if(this.dtoUserId ==="" && this.dtoPlaceId ==="") {
          this.scheduleServiceApi.getSchedulesDateRange(this.selectedDateFrom,this.selectedDateTo)
          .subscribe(
              res => {
                 this.visitActivities = res;
                 console.log(JSON.stringify(this.visitActivities));
              },err => {
                 console.log(err);
                 return;
            });
      }

      if(this.dtoUserId !=="" && this.dtoPlaceId ==="") {
        this.scheduleServiceApi.getSchedulesRep(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId)
        .subscribe(
            res => {           
              this.visitActivities = res;
              console.log(JSON.stringify(this.visitActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId ==="" && this.dtoPlaceId !=="") {
        this.scheduleServiceApi.getSchedulesPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoPlaceId)
        .subscribe(
            res => {           
              this.visitActivities = res;
              console.log(JSON.stringify(this.visitActivities));
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId !=="" && this.dtoPlaceId !=="") {
          this.scheduleServiceApi.getSchedulesRepAndPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId,this.dtoPlaceId)
          .subscribe(
              res => {
                this.visitActivities = res;
                console.log(JSON.stringify(this.visitActivities));
              },err => {
                console.log(err);
                return;
            });
       }
      
    }

    listAuditRetailActivitiesApi(){
      this.checkSetEmptyDateRange();
      this.auditActivities = [];
      if(this.dtoUserId ==="" && this.dtoPlaceId ==="") {
          this.productAuditRetailServiceApi.getProductAuditRetailsDateRange(this.selectedDateFrom,this.selectedDateTo)
          .subscribe(
              res => {
                 this.auditActivities = res;
                 console.log(JSON.stringify(this.auditActivities));
              },err => {
                 console.log(err);
                 return;
            });
      }

      if(this.dtoUserId !=="" && this.dtoPlaceId ==="") {        
        this.productAuditRetailServiceApi.getProductAuditRetailsRep(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId)
        .subscribe(
            res => {           
              this.auditActivities = res;
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId ==="" && this.dtoPlaceId !=="") {
        this.productAuditRetailServiceApi.getProductAuditRetailsPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoPlaceId)
        .subscribe(
            res => {           
              this.auditActivities = res;
            },err => {
              console.log(err);
              return;
          });
       }

       if(this.dtoUserId !=="" && this.dtoPlaceId !=="") {
          this.productAuditRetailServiceApi.getProductAuditRetailsRepAndPlace(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId,this.dtoPlaceId)
          .subscribe(
              res => {
                this.auditActivities = res;
              },err => {
                console.log(err);
                return;
            });
       }
      
    }

    listNewPlacesApi(){
        this.checkSetEmptyDateRange();
        this.newPlaceActivities = [];
        if(this.dtoUserId ==="" && this.dtoPlaceId ==="") {
            this.placeServiceApi.getPlacesDateRange(this.selectedDateFrom,this.selectedDateTo)
            .subscribe(
                res => {
                  this.newPlaceActivities = res;
                  console.log(JSON.stringify(this.newPlaceActivities));
                },err => {
                  console.log(err);
                  return;
              });
        }

        if(this.dtoUserId !=="" && this.dtoPlaceId ==="") {        
          this.placeServiceApi.getPlacesRep(this.selectedDateFrom,this.selectedDateTo,this.dtoUserId)
          .subscribe(
              res => {
                this.newPlaceActivities = res;
              },err => {
                console.log(err);
                return;
            });
        }
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
