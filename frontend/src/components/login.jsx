import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [user, setUser] = useState();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setUser(codeResponse);
      const { code } = codeResponse;
      makeAPICall(code);
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });

  const makeAPICall = async (code) => {
    // Send the authorization code to your backend
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
  };

  return (
    <div>
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
    </div>
  );
};

export default Login;
