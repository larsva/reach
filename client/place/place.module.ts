import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PlaceService} from "./service/place.service";
import {PlaceResolver} from "./place.resolver";
import {PlaceComponent} from "./place.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PlaceComponent
    ],
    providers: [
        PlaceService,
        PlaceResolver
    ],
    exports: [
        PlaceComponent
    ]
})
export class PlaceModule {}
