import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || {}
  );
  const initialState = { auth, setAuth };

  useEffect(() => {
    // login->token->authContext->setToken(token)
    // set the new token on every fresh login call
    if (auth.token) localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth.token]);

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
