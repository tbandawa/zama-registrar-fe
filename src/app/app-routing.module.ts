import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import(`./modules/dashboard.module`).then(module => module.DashboardModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}