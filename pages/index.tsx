import Head from "next/head";
import SignInPage from "pages/Login/LoginPage";

const DefaultPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInPage />
    </>
  );
};

export default DefaultPage;
