import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewStatusComponent } from './viewstatus.component';

const routes: Routes = [
    { path: '', component: ViewStatusComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class ViewStatusRoutingModule { }