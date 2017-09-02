import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';



@Injectable()
export class FormServiceApi {

     constructor(private http:Http){
        
     }

     getForms() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "Form")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getForm(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "Form/" + id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     addForm (formModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "Form", formModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     updateForm (formModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "Form", formModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     

   
     
}