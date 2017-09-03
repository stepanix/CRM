import { Component, OnInit } from '@angular/core';
import {StatusServiceApi} from '../shared/shared';
import { routerTransition } from '../router.animations';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';

@Component({
  selector: 'app-viewstatus',
  templateUrl: './viewstatus.component.html',
  styleUrls: ['./viewstatus.component.scss'],
  animations: [routerTransition()]
})

export class ViewStatusComponent implements OnInit {

  statuses : any[] = [];
  displayDialog : boolean = false;
  StatusModel : any = {};
  statusId : any = "0";

  constructor(private statusServiceApi:StatusServiceApi) { 
    this.StatusModel.Name = "";
    this.listStatusApi();
  }


  ngOnInit() {
  }

  refreshVariables(){
    this.statusId = "0";
    this.StatusModel.Name = "";
  }

  showDialog() {
    this.refreshVariables();
    this.displayDialog = true;
  }

  hideDialog(){
    this.refreshVariables();
    this.displayDialog = false;
  }

  saveStatus(){
    if(this.statusId==="0"){
      this.saveStatusApi();
    }else{
      this.updateStatusApi();
    }
  }

  editStatus(statusvar) {
    this.showDialog();
    this.statusId = statusvar.id;
    this.StatusModel.Name = statusvar.name;
 }

 saveStatusApi() {
    let StatusDtoIn = {
      id: 1,
      name: this.StatusModel.Name
    };
    this.statusServiceApi.addStatus(StatusDtoIn)
    .subscribe(
        res => {
          this.hideDialog();
          this.listStatusApi();
        },err => {
          console.log(err.message);
          return;
      });
  }

  updateStatusApi() {
    let StatusDtoIn = {
      id: this.statusId,
      name: this.StatusModel.Name
   };
   this.statusServiceApi.updateStatus(StatusDtoIn)
   .subscribe(
       res => {
         this.hideDialog();
         this.listStatusApi();
       },err => {
         console.log(err.message);
         return;
     });
  }

  listStatusApi() {
    this.statuses = [];
    this.statusServiceApi.getStatuses()
    .subscribe(
        res => {
          this.statuses = res;
        },err => {
          console.log(err.message);
          return;
      });
  }

  deleteStatusApi(statusvar) {
    if (window.confirm('Are you sure you want to delete?')) {
        this.statusServiceApi.deleteStatus(statusvar.id)
        .subscribe(
            res => {
              this.listStatusApi();
            },err => {
              console.log(err.message);
              return;
          });
    }else{
       return;
    }
}


}
