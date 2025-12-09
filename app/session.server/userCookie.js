import { createCookie } from "react-router";

const userCookie = createCookie("userCookie", {
  secure: true,
  httpOnly: true,
  secrets: [process.env.COOKIE_SECRET_KEY],
  maxAge: 60 * 60 * 24 * 7,
});

export default userCookie;