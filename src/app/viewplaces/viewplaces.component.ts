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
  
  

  constructor(private placeServiceAPi:PlaceServiceApi,statusServiceApi:StatusServiceApi) {
    
  }

  ngOnInit() {
  }

  showPlaceDialog(){

  }

  hidePlaceDialog(){
    
  }

}
