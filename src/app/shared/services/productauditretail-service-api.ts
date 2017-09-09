import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ProductAuditRetailServiceApi {

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

     getProductAuditRetails() : Observable<any[]> {
        return  this.http.get(crmBaseUrl + "ProductAuditRetail"  ,{headers: this.getHeader()})
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }

   getProductAuditRetailsDateRange(dateFrom,dateTo) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "ProductAuditRetail/DateRange?dateFrom=" + dateFrom + "&dateTo=" + dateTo  ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getProductAuditRetailsRep(dateFrom,dateTo,rep) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "ProductAuditRetail/Rep?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getProductAuditRetailsPlace(dateFrom,dateTo,place) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "ProductAuditRetail/Place?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&place=" + place ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getProductAuditRetailsRepAndPlace(dateFrom,dateTo,rep,place) : Observable<any[]> {
      return  this.http.get(crmBaseUrl + "ProductAuditRetail/RepAndPlace?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&rep=" + rep + "&place=" + place ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   getProductAuditRetail(id:number) : Observable<any> {
      return  this.http.get(crmBaseUrl + "ProductAuditRetail/" + id  ,{headers: this.getHeader()})
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
   }

   addProductAuditRetail (formModel: any): Observable<any> {
      return this.http.post(crmBaseUrl + "ProductAuditRetail", formModel  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }

   updateProductAuditRetail (formModel: any): Observable<any> {
      return this.http.put(crmBaseUrl + "ProductAuditRetail", formModel  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }
  
   deleteProductAuditRetail (id: any): Observable<any> {
      return this.http.delete(crmBaseUrl + "ProductAuditRetail/" + id  ,{headers: this.getHeader()}) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
   }
     

   
     
}