import { createCookieSessionStorage } from "react-router";
import userCookie from "./userCookie";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: userCookie,
  });
