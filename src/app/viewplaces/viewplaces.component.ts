import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {PlaceServiceApi,StatusServiceApi} from '../shared/shared';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
   selector: 'app-viewplaces',
   templateUrl: './viewplaces.component.html',
   styleUrls: ['./viewplaces.component.scss'],
   animations: [routerTransition()]
})

export class ViewPlacesComponent implements OnInit {

  
  places : any[] = [];
  
  

  constructor(private placeServiceAPi:PlaceServiceApi) {
    
  }

  ngOnInit() {
    this.loadPlacesApi();
  }

  //Load Status From Remote Database
  loadPlacesApi() {
    this.places = [];
    this.placeServiceAPi.getPlaces()
    .subscribe(
         res => {
           this.places = res;
         },err => {
           console.log(err.message);
           return;
       });
  }

  deletePlaceApi(placevar) {
    if (window.confirm('Are you sure you want to delete?')) {
        this.placeServiceAPi.deletePlace(placevar.id)
        .subscribe(
            res => {
              this.loadPlacesApi();
            },err => {
              console.log(err.message);
              return;
          });
    }else{
       return;
    }
}

}
