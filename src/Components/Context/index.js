import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [erpId, setErpId] = useState(null);
  const [userData, setUserData] = useState(null);


  // Check if the user is already logged in using localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);


  const loginUser = (data) => {
    setUserData(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logoutUser = () => {
    setUserData(null);
    localStorage.clear();
  };


  return (
    <AppContext.Provider
      value={{
        erpId,
        userData,
        loginUser,
        logoutUser,
        setErpId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export { AppContext, AppProvider };
