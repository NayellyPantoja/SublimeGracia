import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContexComponent = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (userLogged) => {
    setUser(userLogged);
    setIsLogged(true)
  };

  const logoutContex = () => {
    setUser({});
    setIsLogged(false)
  };

  let data = {
    user,
    isLogged,
    handleLogin,
    logoutContex,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContexComponent;
