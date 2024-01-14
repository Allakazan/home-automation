import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const ACCESS_TOKEN_KEY = "@home-automation-client/access-token";
export const REFRESH_TOKEN_KEY = "@home-automation-client/refresh-token";

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken_] = useState(
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );
  const [refreshToken, setRefreshToken_] = useState(
    localStorage.getItem(REFRESH_TOKEN_KEY)
  );

  const setAccessToken = (newToken) => {
    setAccessToken_(newToken);
  };

  const setRefreshToken = (newToken) => {
    setRefreshToken_(newToken);
  };

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (401 === error.response.status) {
          if (refreshToken) {
            const {
              data: { access_token, refresh_token },
            } = http.post(
              "/refresh",
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              }
            );

            setAccessToken_(access_token);
            setRefreshToken_(refresh_token);
          } else {
            setAccessToken_(null);
          }
        }

        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }, [refreshToken]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
    }),
    [accessToken, refreshToken]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
