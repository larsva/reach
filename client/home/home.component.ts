import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IArea} from "../area/model/area";
import {AreaService} from "../area/service/area.service";
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    private areas: IArea[] = [];
    constructor(private areaService: AreaService,  private router: Router) {
    }

    ngOnInit():void {
        this.areaService.getAllAreas().then(result => this.areas = result);
        console.log('>> AppComponent.ngOnInit - Areas: ' + JSON.stringify(this.areas));
    }

    onSelectArea(area:IArea) {
        this.router.navigate(['/area', area._id]);
    }
}