export interface IArea {
  bannerImage: string;
  _id: string;
  places: IPlaceRef[];
}
export interface IPlaceRef {
  name: string;
  id: string;
  problems: number;
  geoLocation: IGeoLocation;
}

export interface IGeoLocation {
  latitude: string;
  longitude: string;
}

export class PlaceRef {
  private placeRef: IPlaceRef

  constructor(placeRef: IPlaceRef) {
    this.placeRef = placeRef;
  }

  get latitude(): number {
    return parseFloat(this.placeRef.geoLocation.latitude);
  }

  get longitude(): number {
    return parseFloat(this.placeRef.geoLocation.longitude);
  }

  get name(): string {
    return this.placeRef.name;
  }

  get id(): string {
    return this.placeRef.id;
  }

  get problems(): number {
    return this.placeRef.problems;
  }
}