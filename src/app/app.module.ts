import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routing';

import { HomeComponent } from './route/home/home.component';
import { ConfigService } from './service/config.service';
import { IApiService } from './service/iapi.service';
import { ApiService } from './service/api.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ConfigService,
        { provide: IApiService, useClass: ApiService}
    ]
})
export class AppModule {}