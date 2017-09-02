import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFormsComponent } from './viewforms.component';

const routes: Routes = [
    { path: '', component: ViewFormsComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class ViewFormsRoutingModule { }