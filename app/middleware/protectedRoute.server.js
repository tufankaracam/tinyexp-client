import { redirect } from "react-router";
import { sessionContext } from "./session.server";

export const protectedRouteMiddleware = async ({ request, context }, next) => {
  const userData = context.get(sessionContext);

  if(!userData?.userData?.loggedIn){
    return redirect('/login');
  }
  const response = await next();

  return response;
};
