import {Injectable} from "@angular/core";
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {IArea} from "./model/area";
import {AreaService} from "./service/area.service";

@Injectable()
export class AreaResolver implements Resolve<IArea> {
    constructor(private areaService: AreaService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IArea> {
        let id = route.params['id'];
        return this.areaService.getAreaById(id);
    }
}
