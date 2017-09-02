import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { routerTransition } from '../router.animations';
import {DialogModule,SharedModule,DataTableModule} from 'primeng/primeng';
import {PlaceServiceApi,StatusServiceApi} from '../shared/shared';

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

  constructor(private placeServiceApi : PlaceServiceApi,
    private statusServiceApi:StatusServiceApi) {
      
      this.PlaceModel.Name = "";
      this.PlaceModel.SelectedStatus = -1;
      this.PlaceModel.City = "";
      this.PlaceModel.State = "";
      this.PlaceModel.Zip = "";
      this.PlaceModel.Country = "";
      this.PlaceModel.CountryCode = "";
      
      this.PlaceModel.ContactName = "";
      this.PlaceModel.ContactTitle = "";
      this.PlaceModel.Phone = "";
      this.PlaceModel.CellPhone = "";
      this.PlaceModel.Email = "";
      this.PlaceModel.Website = "";

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

  savePlaceApi(){

  }

  addNewPlaceApi(){

  }

  updatePlaceApi(){
    
  }

}
