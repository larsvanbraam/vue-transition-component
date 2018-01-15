/**
 * @description This should be the vue router type but it causes a lot of issues with mismatching versions so create
 * a separate interface for the route
 */
interface IRoute {
  path: string;
  name?: string;
  hash: string;
  query: { [key: string]: string };
  params: { [key: string]: string };
  fullPath: string;
  matched: Array<any>;
  redirectedFrom?: string;
  meta?: any;
}

export default IRoute;
