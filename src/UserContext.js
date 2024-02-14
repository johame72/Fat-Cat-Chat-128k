import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userApiKey, setUserApiKey] = useState(null);

  return (
    <UserContext.Provider value={{ userApiKey, setUserApiKey }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
