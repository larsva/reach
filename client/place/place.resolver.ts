import {Injectable} from "@angular/core";
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {IPlace} from "./model/place";
import {PlaceService} from "./service/place.service";

@Injectable()
export class PlaceResolver implements Resolve<IPlace> {
    constructor(private placeService: PlaceService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IPlace> {
        let id = route.params['id'];
        return this.placeService.getPlaceById(id);
    }
}
