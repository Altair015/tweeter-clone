import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const initialState = { token, setToken };

  useEffect(() => {
    // login->token->authContext->setToken(token)
    // set the new token on every fresh login call
    if (token) localStorage.setItem("token", token);
  }, [token]);

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
