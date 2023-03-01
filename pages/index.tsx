import { Loader } from "components/core";
import dynamic from "next/dynamic";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import styled from "styled-components";

const LazyLoginPage = dynamic(
  () => import("../src/components/login-page/LoginPage").then(mod => mod.LoginPage),
  {
    loading: () => (
      <LazyLoaderContainer>
        <Loader />
      </LazyLoaderContainer>
    )
  }
);

const Login = () => {
  return (
    <>
      <NextSeo
        title="Log in to Twitter / Twitter"
        description="Log in to Twitter to see the latest. Join the conversation, follow accounts, see your Home Timeline, and catch up on Tweets from the people you know."
      />
      <LazyLoginPage />
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

const LazyLoaderContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
