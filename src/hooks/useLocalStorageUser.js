import { useState, useEffect } from "react";

const useLocalStorageUser = () => {
  
  // Initialize userInLocal state from local storage
  const [userInLocal, setUser] = useState(
    JSON.parse(localStorage.getItem("userInLocal")) || null
  );

  // Function to set userInLocal and save to local storage
  const setUserAndSave = (userData) => {
    setUser(userData);
    localStorage.setItem("userInLocal", JSON.stringify(userData));
  };

  // Function to clear userInLocal and remove from local storage
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("userInLocal");
  };

  // Effect to sync userInLocal with local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInLocal"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return { userInLocal, setUser: setUserAndSave, clearUser };
};

export default useLocalStorageUser;
