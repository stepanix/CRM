import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PhotoServiceApi {

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

     getPhotos() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "Photo"  ,{headers: this.getHeader()})
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getPhotosDateRange(dateFrom,dateTo) : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "Photo/DateRange?dateFrom=" + dateFrom + "&dateTo=" + dateTo  ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getPhotosRep(dateFrom,dateTo,rep) : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "Photo/Rep?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getPhotosPlace(dateFrom,dateTo,place) : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "Photo/Place?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&place=" + place ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getPhotosRepAndPlace(dateFrom,dateTo,rep,place) : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "Photo/RepAndPlace?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep + "&place=" + place ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getPhoto(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "Photo/" + id  ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     addPhoto (formModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "Photo", formModel  ,{headers: this.getHeader()}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     updatePhoto (formModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "Photo", formModel  ,{headers: this.getHeader()}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     deletePhoto (id: any): Observable<any> {
        return this.http.delete(crmBaseUrl + "Photo/" + id  ,{headers: this.getHeader()}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
     

   
     
}