import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';



@Injectable()
export class StatusServiceApi {

     constructor(private http:Http){
        
     }

     getStatuses() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "Status")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getStatus(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "Status/" + id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     addStatus (statusModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "Status", statusModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     updateStatus (statusModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "Status", statusModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     

   
     
}