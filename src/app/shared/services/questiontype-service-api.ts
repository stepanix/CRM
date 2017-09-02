import {Injectable }from '@angular/core';
import  {Http,Response,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {crmBaseUrl} from '../../shared/global-vars';

import 'rxjs/add/operator/catch';


@Injectable()
export class QuestionTypeApi {

     constructor(private http:Http) {
        
     }

     getQuestionTypes() : Observable<any[]> {
          return  this.http.get(crmBaseUrl + "QuestionType")
          .map((response: Response) => response.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }

   
     
}