import {Component, OnInit} from '@angular/core';
import {IArea, IPlaceRef, IGeoLocation, PlaceRef} from "./model/area";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})

export class AreaComponent implements OnInit {
    private area: IArea = <IArea>{};

    get latitude(): number {
       return parseFloat(this.location.latitude);
    }

    get longitude(): number {
        return parseFloat(this.location.longitude);
    }

    get location(): IGeoLocation {
        return this.area.places[0].geoLocation;
    }

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit():void {
        this.area = this.route.snapshot.data['area'];
    }

    onSelectPlace(place) {
        this.router.navigate(['/place', place.id]);
    }


    placeRefs(): PlaceRef[] {
        return this.area.places.map((p) => new PlaceRef(p));
    }

}