import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class RepPlaceServiceApi {

    private token : string;
    private header: Headers;

     constructor(private http:Http) {
        
     }

     getHeader() {
        this.header = new Headers();        
        this.token = 'bearer ' + localStorage.getItem('token');
        this.header.append('Authorization', this.token);
        this.header.append('Content-Type', 'application/json');   
        return this.header; 
     }

     getRepPlaces() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "RepresentativePlace" ,{headers: this.getHeader()})
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getRepPlace(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "RepresentativePlace/" + id ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getRepByPlaceId(id:number) : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "RepresentativePlace/ByPlaceId?id=" + id ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }
     

     addRepPlace (repPlaceModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "RepresentativePlace", repPlaceModel ,{headers: this.getHeader()}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     addRepPlaceList (repPlaceModel: any[]): Observable<any> {
        return this.http.post(crmBaseUrl + "RepresentativePlace/List", repPlaceModel ,{headers: this.getHeader()}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }


     updateRepPlace (formModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "RepresentativePlace", formModel ,{headers: this.getHeader()}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     deleteRepPlace (id: any): Observable<any> {
        return this.http.delete(crmBaseUrl + "RepresentativePlace/" + id ,{headers: this.getHeader()}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     

   
     
}