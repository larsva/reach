import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {IPlace} from "../model/place";

@Injectable()
export class PlaceService {
   
    constructor(private http: Http) {
    }
    
    getPlaceById(id: string): Promise<IPlace[]|any> {
        const url = `reach/place/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                let result = response.json() as IPlace;
                console.log('> PlaceService:getPlaceById: ' + JSON.stringify(result));
                return result;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('Error: ', error);
        return Promise.reject(error.message || error);
    }
}