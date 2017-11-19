import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesReportComponent } from './salesreport.component';


const routes: Routes = [
    { path: '', component: SalesReportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesReportRoutingModule { }