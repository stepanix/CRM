import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class TimeMileageServiceApi {

    private token : string;
    private header: Headers;

     constructor(private http:Http){
        
     }

     getHeader() {
        this.header = new Headers();        
        this.token = 'bearer ' + localStorage.getItem('token');
        this.header.append('Authorization', this.token);
        this.header.append('Content-Type', 'application/json');   
        return this.header; 
     }

     getTimeMileages() : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "TimeMileage"  ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getTimeMileagesDateRange(dateFrom,dateTo) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "TimeMileage/DateRange?dateFrom=" + dateFrom + "&dateTo=" + dateTo  ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getTimeMileagesRep(dateFrom,dateTo,rep) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "TimeMileage/Rep?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getTimeMileagesPlace(dateFrom,dateTo,place) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "TimeMileage/Place?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&place=" + place ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getTimeMileagesRepAndPlace(dateFrom,dateTo,rep,place) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "TimeMileage/RepAndPlace?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep + "&place=" + place ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getTimeMileage(id:number) : Observable<any> {
      return  this.http.get(crmBaseUrl + "TimeMileage/" + id  ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   addTimeMileage (formModel: any): Observable<any> {
      return this.http.post(crmBaseUrl + "TimeMileage", formModel  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }

   updateTimeMileage (formModel: any): Observable<any> {
      return this.http.put(crmBaseUrl + "TimeMileage", formModel  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }
  
   deleteTimeMileage (id: any): Observable<any> {
      return this.http.delete(crmBaseUrl + "TimeMileage/" + id  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }
     

   
     
}