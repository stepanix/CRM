import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';



@Injectable()
export class ProductServiceApi {

     constructor(private http:Http){
        
     }

     getProducts() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "Product")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     getProduct(id:number) : Observable<any> {
        return  this.http.get(crmBaseUrl + "Product/" + id)
        .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error'));
     }

     addProduct (productModel: any): Observable<any> {
        return this.http.post(crmBaseUrl + "Product", productModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     updateProduct (productModel: any): Observable<any> {
        return this.http.put(crmBaseUrl + "Product", productModel) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }

     deleteProduct (id: any): Observable<any> {
        return this.http.delete(crmBaseUrl + "Product/" + id) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json() || 'Server error')); //...errors if any
     }
    
     

   
     
}