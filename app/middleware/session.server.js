import { createContext } from "react-router";
import { commitSession, getSession } from "../session.server/userSession";
import { getUserDataBySession } from "../services/userSessionManager.server";

export const sessionContext = createContext(null);

export const sessionMiddleware = async ({ request, context }, next) => {
  const session = await getSession(request.headers.get("cookie"));
  let sessionId = session.get("sessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    session.set("sessionId", sessionId);
  }

  let userData = getUserDataBySession(sessionId);
  if(!userData){
    userData = {
        loggedIn:false,
        username:null
    }
  }
  context.set(sessionContext, { sessionId, userData });

  const response = await next();
  response.headers.set("Set-Cookie", await commitSession(session));

  return response;
};
