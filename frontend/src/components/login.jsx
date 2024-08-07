import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import EmailsData from "./emailsData";
const Login = () => {
  const [user, setUser] = useState();
  const [authStatus, setAuthStatus] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setUser(codeResponse);
      const { code } = codeResponse;
      makeAPICall(code);
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/pubsub",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "openid",
    ].join(" "),
  });

  // "https://www.googleapis.com/auth/gmail.readonly
  // https://www.googleapis.com/auth/userinfo.profile
  // https://www.googleapis.com/auth/calendar.readonly
  // openid
  // https://www.googleapis.com/auth/userinfo.email
  // https://www.googleapis.com/auth/pubsub"

  const makeAPICall = async (code) => {
    // Send the authorization code to your backend
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/store-tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await res.json();
      console.log("Backend response:", data);
      if (data?.pubSubStatus == true)
        setAuthStatus("Login Success and pub sub created");
      else {
        setAuthStatus("Login Success but pub sub not created");
      }
    } catch (e) {
      setAuthStatus("Login Failed");
      // console.log(e.json());
    }
    setTimeout(() => {
      setAuthStatus("");
    }, 10000);
  };

  return (
    <div>
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
      <h3>Note:</h3>
      <p>
        If you are workspace admin then kindly add our app in your workspace by
        going to Google Admin
      </p>
      <p>
        <strong>Client ID:</strong>
        226341879966-a1nf9tfijbfkjqrlmqpdephpjd5ilquh.apps.googleusercontent.com
      </p>
      <hr />
      {authStatus && (
        <>
          <p style={{ fontSize: "24px", color: "blue" }}>{authStatus}</p>
          <hr />
        </>
      )}
      <EmailsData />
    </div>
  );
};

export default Login;
