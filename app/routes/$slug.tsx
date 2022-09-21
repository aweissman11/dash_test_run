import * as routeUtils from "~/contentful/route-utils";

export const headers = routeUtils.headers;

export const meta = routeUtils.meta;

export const loader = routeUtils.getContentfulPageLoader();

export default routeUtils.ContentfulPageComponent;
