import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportScheduleDetailsComponent } from './reportscheduledetails.component';


const routes: Routes = [
    { path: '', component: ReportScheduleDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportScheduleDetailsRoutingModule { }