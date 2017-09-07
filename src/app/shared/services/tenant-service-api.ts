import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class TenantServiceApi {

     constructor(private http:Http){
        
     }

     getTenants() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "Tenant")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getTenant(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "Tenant/" + id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     addTenant (TenantModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "Tenant", TenantModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     updateTenant (TenantModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "Tenant", TenantModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     
     deleteTenant (id: any): Observable<any> {
        return this.http.delete(crmBaseUrl + "Tenant/" + id) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
   
     
}