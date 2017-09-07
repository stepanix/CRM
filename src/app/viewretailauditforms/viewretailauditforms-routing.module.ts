import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRetailAuditFormsComponent } from './viewretailauditforms.component';

const routes: Routes = [
    { path: '', component: ViewRetailAuditFormsComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class ViewRetailAuditFormsRoutingModule { }