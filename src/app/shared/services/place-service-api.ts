import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';



@Injectable()
export class PlaceServiceApi {

     constructor(private http:Http) {
        
     }

     getPlaces() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "Place")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getPlace(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "Place/" + id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     addPlace (placeModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "Place", placeModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     updatePlace (placeModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "Place", placeModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     

   
     
}