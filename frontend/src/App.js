// src/App.js

import React from "react";
import "./App.css";
import Login from "./components/login";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH2_CLIENT_ID}>
      <div className="App">
        <Login />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
