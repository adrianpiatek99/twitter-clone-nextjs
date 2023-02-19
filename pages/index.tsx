import { LoginPage } from "components/login-page";
import LoginContextProvider from "context/LoginContext";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";
import { NextSeo } from "next-seo";

const Login = () => {
  return (
    <>
      <NextSeo
        title="Log in to Twitter / Twitter"
        description="Log in to Twitter to see the latest. Join the conversation, follow accounts, see your Home Timeline, and catch up on Tweets from the people you know."
      />
      <LoginContextProvider>
        <LoginPage />
      </LoginContextProvider>
    </>
  );
};

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default Login;
