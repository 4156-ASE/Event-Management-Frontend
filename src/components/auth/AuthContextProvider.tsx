import { ReactNode, createContext, useEffect, useState } from 'react';

interface AuthContext {
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContext>({
  auth: localStorage.getItem('token'),
  setAuth: () => {
    //
  },
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<string | null>(localStorage.getItem('token'));
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
