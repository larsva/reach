import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent}   from './app.component';
import {AreaModule} from "./area/area.module";
import {AreaService} from "./area/service/area.service";
import {AreaComponent} from "./area/area.component";
import {HomeModule} from "./home/home.module";
import {PlaceModule} from "./place/place.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        AreaModule,
        PlaceModule,
        HomeModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
