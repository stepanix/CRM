import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {PanelModule} from 'primeng/primeng';
import {} from '@types/googlemaps';



@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [routerTransition()]
})

export class ActivitiesComponent implements OnInit {

  dateFrom: any="";
  dateTo: any="";
  

  options: any;

  overlays: any[];

  constructor() { }

  ngOnInit() {
    this.options = {
      center: {lat: -26.0323027, lng: 28.0363948},
      zoom: 12
    };

    // this.overlays = [
    //   new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
    //   new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
    //   new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"})      
    //  ];
  }


  

}
