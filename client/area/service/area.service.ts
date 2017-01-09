import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {IArea} from "../model/area";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AreaService {
   
    constructor(private http: Http) {
    }
    
    getAllAreas(): Promise<IArea[]|any> {
        return this.http.get('reach/area')
            .toPromise()
            .then(response => {
                let result = response.json() as IArea[];
                console.log('> AreaService:getAllAreas: ' + JSON.stringify(result));
                return result;
            })
            .catch(this.handleError);
    }
    getAreaById(id: string): Promise<IArea[]|any> {
        const url = `reach/area/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                let result = response.json() as IArea;
                console.log('> AreaService:getAreaById: ' + JSON.stringify(result));
                return result;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('Error: ', error);
        return Promise.reject(error.message || error);
    }
}