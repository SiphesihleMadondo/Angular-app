import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KPIPRACTICEComponent } from './kpi-practice/kpi-practice.component';
import { SecondChartComponent } from './second-chart/second-chart.component';
import { LoginComponent } from './login/login.component';
import { AllComponent } from './all/all.component';


export const routes: Routes = [

  
  { path: '', redirectTo: 'Login', pathMatch: 'full'},
  { path: 'Login', component: LoginComponent},
  { path: 'All', component: AllComponent},
  { path: 'KPI Practice', component: KPIPRACTICEComponent},
  { path: 'Other_charts', component: SecondChartComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
