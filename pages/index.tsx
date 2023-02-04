import LoginContextProvider from "context/LoginContext";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";
import { LoginPage } from "templates/login-page";

const Login = () => {
  return (
    <>
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
