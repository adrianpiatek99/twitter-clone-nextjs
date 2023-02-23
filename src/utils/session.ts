import type { Session } from "next-auth";

export const reloadSession = () => {
  const event = new Event("visibilitychange");

  document.dispatchEvent(event);
};

export const verifyMe = (session: Session | null, screenName: string) => {
  return session ? screenName.toLowerCase() === session.user.screenName?.toLowerCase() : false;
};
