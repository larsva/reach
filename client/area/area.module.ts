import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AreaService} from "./service/area.service";
import {AreaResolver} from "./area.resolver";
import {AreaComponent} from "./area.component";
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        AreaComponent
    ],
    providers: [
        AreaService,
        AreaResolver
    ],
    exports: [
        AreaComponent
    ]
})
export class AreaModule {}
