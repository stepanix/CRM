import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class NoteServiceApi {

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

     getNotes() : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "Note"  ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getNotesDateRange(dateFrom,dateTo) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "Note/DateRange?dateFrom=" + dateFrom + "&dateTo=" + dateTo  ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getNotesRep(dateFrom,dateTo,rep) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "Note/Rep?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getNotesPlace(dateFrom,dateTo,place) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "Note/Place?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&place=" + place ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getNotesRepAndPlace(dateFrom,dateTo,rep,place) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "Note/RepAndPlace?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep + "&place=" + place ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getNote(id:number) : Observable<any> {
      return  this.http.get(crmBaseUrl + "Note/" + id  ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   addNote (formModel: any): Observable<any> {
      return this.http.post(crmBaseUrl + "Note", formModel  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }

   updateNote (formModel: any): Observable<any> {
      return this.http.put(crmBaseUrl + "Note", formModel  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }
  
   deleteNote (id: any): Observable<any> {
      return this.http.delete(crmBaseUrl + "Note/" + id  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }
     

   
     
}