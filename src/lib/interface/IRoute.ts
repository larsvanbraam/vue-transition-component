/**
 * This should be the vue router type but it causes a lot of issues with mismatching versions so create
 * a separate interface for the route
 */
export interface IRoute {
  /**
   * The target path of the route
   */
  path: string;

  /**
   * The target name of the route
   */
  name?: string;

  /**
   * The hash that is part of the route
   */
  hash: string;

  /**
   * Any query params that are part of the route will be in here
   */
  query: { [key: string]: string };

  /**
   * Any route params will be in here
   */
  params: { [key: string]: string };

  /**
   * This is the full path of the route that we will navigate to
   */
  fullPath: string;

  /**
   * An array of the matched vue components
   */
  matched: Array<any>;

  /**
   * When redirected this will contain the path of the source
   */
  redirectedFrom?: string;

  /**
   * Any meta data defined on the route object
   */
  meta?: any;
}
