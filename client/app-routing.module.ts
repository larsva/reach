import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AreaComponent} from "./area/area.component";
import {AreaResolver} from "./area/area.resolver";
import {HomeComponent} from "./home/home.component";
import {PlaceComponent} from "./place/place.component";
import {PlaceResolver} from "./place/place.resolver";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'area/:id',
        component: AreaComponent,
        resolve: {
            area: AreaResolver
        }
    },
    {
        path: 'place/:id',
        component: PlaceComponent,
        resolve: {
            place: PlaceResolver
        }
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {
    
}