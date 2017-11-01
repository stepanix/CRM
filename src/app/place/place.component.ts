import { Component, OnInit,ViewChild, ElementRef,NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import { routerTransition } from '../router.animations';
import {DialogModule,SharedModule,DataTableModule,ListboxModule} from 'primeng/primeng';
import {PlaceServiceApi,StatusServiceApi,RepPlaceServiceApi,UserServiceApi} from '../shared/shared';
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import {} from '@types/googlemaps';

import {SelectItem} from 'primeng/primeng';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-place',
    templateUrl: './place.component.html',
    styleUrls: ['./place.component.scss'],
    animations: [routerTransition()]
})


export class PlaceComponent implements OnInit {

    busy: Subscription;
    PlaceModel : any = {};
    placeId : any = "0";
    status : any[] = [];
    reps : any[] = [];
    
    RepPlaceDtoIn : any[] =[];
    users : SelectItem[] = [];
    SelectedUsers : any[] = [];

    displayReplist : boolean = false;
    displayAddress : boolean = false;

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    PlaceDtoIn: any;    
    
    @ViewChild("search")
    public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route:ActivatedRoute,
    private userServiceApi : UserServiceApi,
    private repPlaceServiceApi : RepPlaceServiceApi,
    private placeServiceApi : PlaceServiceApi,
    private statusServiceApi:StatusServiceApi) {

    }

   ngOnInit() {
        this.loadStatusApi();
        this.placeId = this.route.snapshot.params['placeid'];
      
        this.PlaceModel.Name = "";
        this.PlaceModel.SelectedStatus = -1;
        this.PlaceModel.StreetAddress ="";
      
        this.PlaceModel.ContactName = "";
        this.PlaceModel.ContactTitle = "";
        this.PlaceModel.Phone = "";
        this.PlaceModel.CellPhone = "";
        this.PlaceModel.Email = "";
        this.PlaceModel.Website = "";

        if (this.placeId !== Number("0")) {
            this.getPlaceApi();
        }

      //set google maps defaults
       this.zoom = 4;
       this.latitude = -26.0323027;
       this.longitude = 28.0363948;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
     this.setCurrentPosition();
     
         //load Places Autocomplete
         this.mapsAPILoader.load().then(() => {
           let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
             types: ["address"]
           });
           autocomplete.addListener("place_changed", () => {
             this.ngZone.run(() => {
               //get the place result
               let place: google.maps.places.PlaceResult = autocomplete.getPlace();
       
               //verify result
               if (place.geometry === undefined || place.geometry === null) {
                 return;
               }
               
               this.PlaceModel.StreetAddress = place.formatted_address;
               //set latitude, longitude and zoom
               this.latitude = place.geometry.location.lat();
               this.longitude = place.geometry.location.lng();
               
               this.zoom = 12;
             });
           });
         });
   }

   private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

   

   showRepList(){
     this.listUnAssignedRepPlacesApi();
     this.displayReplist= true;
   }

   hideRepList(){
    this.displayReplist= false;
   }

  parsePlaceid():string {
      if (this.placeId==="0") {
        return "";
      }else{
        return this.placeId;
      }
  }

  //Load Status From Remote Database
  loadStatusApi() {
    this.status = [];
    this.busy=this.statusServiceApi.getStatuses()
    .subscribe(
         res => {
           this.status = res;
         },err => {
           console.log(err);
           return;
       });
  }

  //get place details from remote database
  getPlaceApi() {
    this.busy=this.placeServiceApi.getPlace(this.placeId)
    .subscribe(
         res => {
            this.PlaceModel.Name = res.name;
            this.PlaceModel.SelectedStatus = res.statusId;
            this.PlaceModel.StreetAddress = res.StreetAddress;
            this.PlaceModel.ContactName = res.contactName;
            this.PlaceModel.ContactTitle = res.contactTitle;
            this.PlaceModel.Phone = res.phone;
            this.PlaceModel.CellPhone = res.cellPhone;
            this.PlaceModel.Email = res.email;
            this.PlaceModel.Website = res.webSite;
            this.listRepPlacesApi();
         },err => {
           console.log(err);
           return;
       });
  }

  savePlaceApi(){
      if(this.placeId==="0"){
          this.addNewPlaceApi();
      }else{
          this.updatePlaceApi();
      }
  }

  setDtoInputModel(idvar:number){
      this.PlaceDtoIn = {
        id: idvar,
        name: this.PlaceModel.Name,
        streetAddress: this.PlaceModel.StreetAddress,
        statusId: this.PlaceModel.SelectedStatus,
        email: this.PlaceModel.Email,
        webSite: this.PlaceModel.Website,
        contactName: this.PlaceModel.ContactName,
        contactTitle: this.PlaceModel.ContactTitle,
        phone: this.PlaceModel.Phone,
        cellPhone: this.PlaceModel.CellPhone,
        comment: "",
        latitude: this.latitude,
        longitude : this.longitude
    };
  }

  //Add new place to Remote database
  addNewPlaceApi(){
      this.setDtoInputModel(0);
      this.busy=this.placeServiceApi.addPlace(this.PlaceDtoIn)
      .subscribe(
          res => {
              this.placeId = res.id;
              this.parsePlaceid();
              alert("Place Saved Successfully");
              //console.log(JSON.stringify(res));
          },err => {
            console.log(err);
            return;
        });
  }

  updatePlaceApi(){
   this.setDtoInputModel(this.placeId);
   this.busy=this.placeServiceApi.updatePlace(this.PlaceDtoIn)
  .subscribe(
      res => {
        alert("Place Updated Successfully");
      },err => {
        console.log(err);
        return;
    });
  }

  cancel(){
    this.router.navigate(['/viewplaces']);
  }

  //List Assigned Reps from Remote Database
  listRepPlacesApi(){
    this.reps = [];
    this.busy=this.repPlaceServiceApi.getRepByPlaceId(this.placeId)
    .subscribe(
        res => {
          for(var i=0; i<res.length; i++) {
            this.reps.push({
              id: res[i].id,
              userId : res[i].userId,
              fullName : res[i].user.firstName + " " + res[i].user.surname
            })
          }
        },err => {          
          console.log(err);
          return;
      });
  }

  //List UnAssigned Reps from Remote Database
  listUnAssignedRepPlacesApi(){
    this.users = [];
    this.busy=this.userServiceApi.getUnAssignedReps(this.placeId)
    .subscribe(
        res => {
          for(var i=0;i<res.length;i++){
            this.users.push({
               value: res[i].id,
               label: res[i].firstName + "  " + res[i].surname
            })
          }
          
          console.log(JSON.stringify(this.users));
        },err => {
          console.log(err);
          return;
      });
  }

  //Add list of Reps to Remote Database
  addRepPlaceListApi() {
    this.RepPlaceDtoIn = [];
    for(var i=0; i<this.SelectedUsers.length;i++){
      this.RepPlaceDtoIn.push({
         userId: this.SelectedUsers[0],
         placeId: this.placeId
      });
    }
    //console.log(JSON.stringify(this.RepPlaceDtoIn));
    this.busy=this.repPlaceServiceApi.addRepPlaceList(this.RepPlaceDtoIn)
    .subscribe(
        res => {
          this.hideRepList();
          this.listRepPlacesApi();
            //console.log(JSON.stringify(res));
        },err => {
          console.log(err);
          return;
      });
  }
  
  deleteRepApi(repvar) {
     if (window.confirm('Are you sure you want to delete?')) {
      this.busy=this.repPlaceServiceApi.deleteRepPlace(repvar.id)
          .subscribe(
              res => {
                this.listRepPlacesApi();
              },err => {
                console.log(err);
                return;
            });
      }else{
        return;
      }
  }
  

}
