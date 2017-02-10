import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent}   from './app.component';
import {AreaModule} from "./area/area.module";
import {HomeModule} from "./home/home.module";
import {PlaceModule} from "./place/place.module";
import {AgmCoreModule} from "angular2-google-maps/core";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        AreaModule,
        PlaceModule,
        HomeModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA1YUBLUllbIqTCDCvMIuay_poSeR251Ig'
        })
    ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        AppComponent
     ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
