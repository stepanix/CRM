import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTenantsComponent } from './viewtenants.component';

const routes: Routes = [
    { path: '', component: ViewTenantsComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class ViewTenantsRoutingModule { }