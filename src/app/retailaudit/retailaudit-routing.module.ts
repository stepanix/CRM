import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailAuditComponent } from './retailaudit.component';

const routes: Routes = [
    { path: '', component: RetailAuditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailAuditRoutingModule { }