import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule, routes } from './app-routing.module'
import { AppComponent } from './app.component'
import { HighchartsChartModule} from 'highcharts-angular'
import { ChartComponentComponent } from './chart-component/chart-component.component'
import { HttpClientModule } from '@angular/common/http';
import { AppServiceService } from './service/app-service.service';
import { SecondChartComponent } from './second-chart/second-chart.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxButtonModule, DxDropDownButtonModule, DxToolbarModule, DxProgressBarModule } from 'devextreme-angular';
import { DxFormModule } from 'devextreme-angular';
import { DxDropDownBoxModule, DxListModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxPopupModule } from 'devextreme-angular';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { DxRangeSelectorModule } from 'devextreme-angular';
import { KPIPRACTICEComponent } from './kpi-practice/kpi-practice.component';
import { RouterOutlet, provideRouter } from '@angular/router';
import { ShareDataServiceService } from './service/share-data-service.service'
//import { Integration } from './Model/IntegrationStats';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatRadioModule} from '@angular/material/radio';
import {LayoutModule} from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm,ReactiveFormsModule , Validators } from '@angular/forms';

import Accessibility from 'highcharts/modules/accessibility';
import * as Highcharts from 'highcharts'
import { LoginComponent } from './login/login.component'
import { AllComponent } from './all/all.component'

Accessibility(Highcharts);






@NgModule({
  declarations: [AppComponent, ChartComponentComponent, SecondChartComponent, LoginComponent, AllComponent ],
  imports: [BrowserModule, AppRoutingModule, HighchartsChartModule, HttpClientModule,NgbModule, MatCardModule,
    DxButtonModule, DxFormModule, DxDropDownBoxModule, DxListModule, DxDropDownButtonModule,LayoutModule, ReactiveFormsModule,
    DxToolbarModule, DxSelectBoxModule, DxPopupModule, DxProgressBarModule, DxRangeSelectorModule, RouterOutlet, BrowserAnimationsModule, MatRadioModule, KPIPRACTICEComponent,
     ],
  providers: [ provideRouter(routes), AppServiceService, ShareDataServiceService,KPIPRACTICEComponent, { provide: HighchartsChartModule, useFactory: () => [NoDataToDisplay]},
],//to use a function or value from another component, pass that component on the constructor to use,
 // then also on app.module pass it on providers: [] AppServiceService, ThirdChartComponent
  bootstrap: [AppComponent]
})
export class AppModule {}
