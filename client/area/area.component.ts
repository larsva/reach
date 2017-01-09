import {Component, OnInit} from '@angular/core';
import {IArea} from "./model/area";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
    selector: 'area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})

export class AreaComponent implements OnInit {
    private area: IArea = <IArea>{};

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit():void {
        this.area = this.route.snapshot.data['area'];
    }

    onSelectPlace(place) {
        this.router.navigate(['/place', place.id]);
    }
}