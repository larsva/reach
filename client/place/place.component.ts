import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPlace} from "./model/place";
@Component({
    selector: 'place',
    templateUrl: './place.component.html',
    styleUrls: ['./place.component.css']
})

export class PlaceComponent implements OnInit {
    private place: IPlace = <IPlace>{};

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit():void {
        this.place = this.route.snapshot.data['place'];
    }

    onSelectBoulder(boulder) {

    }
}