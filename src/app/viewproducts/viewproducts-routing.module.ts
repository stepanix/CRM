import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductsComponent } from './viewproducts.component';

const routes: Routes = [
    { path: '', component: ViewProductsComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class ViewProductsRoutingModule { }