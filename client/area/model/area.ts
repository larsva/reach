export interface IArea {
  bannerImage: string;
  _id: string;
  route: IRoute
}

interface IRoute {
  path: string;
  id: string;
}