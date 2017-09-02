import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';



@Injectable()
export class UserServiceApi {

     constructor(private http:Http){
        
     }

     getUsers() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "Status")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getUnAssignedReps(placeid:number) : Observable<any[]> {
         console.log(crmBaseUrl + "User/UnAssignedReps?placeId=" + placeid);
        return  this.http.get(crmBaseUrl + "User/UnAssignedReps?placeId=" + placeid)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

   
     
}