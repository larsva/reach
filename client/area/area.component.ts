import {Component, OnInit} from '@angular/core';
import {IArea, IGeoLocation, PlaceRef} from "./model/area";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})

export class AreaComponent implements OnInit {
    private area: IArea = <IArea>{};
    private placeRefs: PlaceRef[] = [];
    get latitude(): number {
        console.log('Area latitude: ' + parseFloat(this.location.latitude));
       return parseFloat(this.location.latitude);
    }

    get longitude(): number {
        console.log('Area longitude: ' + parseFloat(this.location.longitude));
        return parseFloat(this.location.longitude);
    }

    get location(): IGeoLocation {
        return this.area.places[0].geoLocation;
    }

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit():void {
        this.area = this.route.snapshot.data['area'];
        this.placeRefs = this.area.places.map((p) => new PlaceRef(p));
    }

    onSelectPlace(place) {
        this.router.navigate(['/place', place.id]);
    }
    
}