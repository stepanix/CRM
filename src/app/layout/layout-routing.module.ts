import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
     {
            path: '', component: LayoutComponent,
            children: [
                // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
                // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
                { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
                { path: 'activities', loadChildren: '../activities/activities.module#ActivitiesModule' },
                { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule' },
                { path: 'reportdetail/:id', loadChildren: '../reportdetail/reportdetail.module#ReportDetailModule' },
                { path: 'viewtenants', loadChildren: '../viewtenants/viewtenants.module#ViewTenantsModule' },
                { path: 'viewusers', loadChildren: '../viewusers/viewusers.module#ViewUsersModule' },
                { path: 'viewproducts', loadChildren: '../viewproducts/viewproducts.module#ViewProductsModule' },
                { path: 'viewstatus', loadChildren: '../viewstatus/viewstatus.module#ViewStatusModule' },
                { path: 'viewforms', loadChildren: '../viewforms/viewforms.module#ViewFormsModule' },
                { path: 'form/:formid', loadChildren: '../form/form.module#FormModule' },
                { path: 'viewplaces', loadChildren: '../viewplaces/viewplaces.module#ViewPlacesModule' },
                { path: 'place/:placeid', loadChildren: '../place/place.module#PlaceModule' },
                { path: 'schedule', loadChildren: '../schedule/schedule.module#ScheduleViewModule' },
                { path: 'viewretailauditforms', loadChildren: '../viewretailauditforms/viewretailauditforms.module#ViewRetailAuditFormsModule' },
                { path: 'retailauditform/:id', loadChildren: '../retailaudit/retailaudit.module#RetailAuditModule' },               

                { path: 'forms', loadChildren: './form/form.module#FormModule' },
                // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
                // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
                { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
                // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
           ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
