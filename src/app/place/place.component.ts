import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { routerTransition } from '../router.animations';
import {DialogModule,SharedModule,DataTableModule} from 'primeng/primeng';
import {PlaceServiceApi,StatusServiceApi} from '../shared/shared';
import {Message} from 'primeng/primeng';


@Component({
   selector: 'app-place',
   templateUrl: './place.component.html',
   styleUrls: ['./place.component.scss'],
   animations: [routerTransition()]
})

export class PlaceComponent implements OnInit {

  PlaceModel : any = {};
  placeId : any = "0";
  status : any[] = [];
  reps : any[] = [];
  

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private placeServiceApi : PlaceServiceApi,
    private statusServiceApi:StatusServiceApi) {


      this.placeId = this.route.snapshot.params['placeid'];
      
      this.PlaceModel.Name = "";
      this.PlaceModel.SelectedStatus = -1;
      this.PlaceModel.City = "";
      this.PlaceModel.State = "";
      this.PlaceModel.Zip = "";
      this.PlaceModel.Country = "";
      this.PlaceModel.CountryCode = "";
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

    }

  ngOnInit() {
    this.loadStatusApi();
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
    this.statusServiceApi.getStatuses()
    .subscribe(
         res => {
           this.status = res;
         },err => {
           console.log(err.message);
           return;
       });
  }

  //get place details from remote database
  getPlaceApi() {
    this.placeServiceApi.getPlace(this.placeId)
    .subscribe(
         res => {
            this.PlaceModel.Name = res.name;
            this.PlaceModel.SelectedStatus = res.statusId;
            this.PlaceModel.StreetAddress = res.StreetAddress;
            this.PlaceModel.City = res.city;
            this.PlaceModel.State = res.state;
            this.PlaceModel.Zip = res.zip;
            this.PlaceModel.Country = res.country;
            this.PlaceModel.ContactName = res.contactName;
            this.PlaceModel.ContactTitle = res.contactTitle;
            this.PlaceModel.Phone = res.phone;
            this.PlaceModel.CellPhone = res.cellPhone;
            this.PlaceModel.Email = res.email;
            this.PlaceModel.Website = res.webSite;
         },err => {
           console.log(err.message);
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

  //Add new place to Remote database
  addNewPlaceApi(){
        let PlaceDtoIn = {
          id: 0,
          name: this.PlaceModel.Name,
          streetAddress: this.PlaceModel.StreetAddress,
          city: this.PlaceModel.City,
          state: this.PlaceModel.State,
          zip: this.PlaceModel.Zip,
          zipExtension: "",
          country: this.PlaceModel.Country,
          statusId: this.PlaceModel.SelectedStatus,
          email: this.PlaceModel.Email,
          webSite: this.PlaceModel.Website,
          contactName: this.PlaceModel.ContactName,
          contactTitle: this.PlaceModel.ContactTitle,
          phone: this.PlaceModel.Phone,
          cellPhone: this.PlaceModel.CellPhone,
          comment: ""
      };
      this.placeServiceApi.addPlace(PlaceDtoIn)
      .subscribe(
          res => {
              this.placeId = res.id;
              this.parsePlaceid();
              alert("Place Saved Successfully");
              //console.log(JSON.stringify(res));
          },err => {
            console.log(err.message);
            return;
        });
  }

  updatePlaceApi(){
    let PlaceDtoIn = {
      id: this.placeId,
      name: this.PlaceModel.Name,
      streetAddress: this.PlaceModel.StreetAddress,
      city: this.PlaceModel.City,
      state: this.PlaceModel.State,
      zip: this.PlaceModel.Zip,
      zipExtension: "",
      country: this.PlaceModel.Country,
      statusId: this.PlaceModel.SelectedStatus,
      email: this.PlaceModel.Email,
      webSite: this.PlaceModel.Website,
      contactName: this.PlaceModel.ContactName,
      contactTitle: this.PlaceModel.ContactTitle,
      phone: this.PlaceModel.Phone,
      cellPhone: this.PlaceModel.CellPhone,
      comment: ""
  };
  this.placeServiceApi.updatePlace(PlaceDtoIn)
  .subscribe(
      res => {
        alert("Place Updated Successfully");
      },err => {
        console.log(err.message);
        return;
    });
  }

  cancel(){
    this.router.navigate(['/viewplaces']);
  }
  

}
