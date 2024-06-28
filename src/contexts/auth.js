import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getUser, signIn as sendSignInRequest } from "../api/auth";

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      let userDetails = result.data;
      if (result.isOk) {
        setUser(userDetails);
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (userName, password) => {
    const result = await sendSignInRequest(userName, password);
    if (result.isOk) {
      console.log(result.data);
      localStorage.setItem("cr", "/Dashboard");
      localStorage.setItem("stab", "Dashboard");
      setUser(result.data);
    }

    return result;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("authToken");

    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, loading }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
