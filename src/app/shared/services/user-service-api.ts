import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl,loginUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';


@Injectable()
export class UserServiceApi {

     constructor(private http:Http) {
        
     }

     getUsers() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "User")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getUser(id:string) : Observable<any> {
        return  this.http.get(crmBaseUrl + "User/"+ id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getUnAssignedReps(placeid:number) : Observable<any[]> {
         console.log(crmBaseUrl + "User/UnAssignedReps?placeId=" + placeid);
        return  this.http.get(crmBaseUrl + "User/UnAssignedReps?placeId=" + placeid)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     addUser (UserModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "Account/Register", UserModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     updateUser (UserModel: any) : Observable<any> {
        return this.http.put(crmBaseUrl + "User", UserModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
     
}