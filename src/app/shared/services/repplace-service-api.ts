import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';


@Injectable()
export class RepPlaceServiceApi {

     constructor(private http:Http) {
        
     }

     getRepPlaces() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "RepresentativePlace")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getRepPlace(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "RepresentativePlace/" + id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getRepByPlaceId(id:number) : Observable<any[]> {         
        return  this.http.get(crmBaseUrl + "RepresentativePlace/ByPlaceId?id=" + id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }
     

     addRepPlace (repPlaceModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "RepresentativePlace", repPlaceModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     addRepPlaceList (repPlaceModel: any[]): Observable<any> {
        return this.http.post(crmBaseUrl + "RepresentativePlace/List", repPlaceModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }


     updateRepPlace (formModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "RepresentativePlace", formModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     

   
     
}