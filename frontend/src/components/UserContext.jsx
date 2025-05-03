import { createContext, useState, useEffect } from 'react';

//we first create and export (export so others can import) the context
// this is essentially a SHARED DATA CONTAINER that our other components can tap into using useContext
export const UserContext = createContext();

//this exports react component UserProvider. It takes children and gives them access to the context.
//note we use this UserProvider compoennt in App.js
export const UserProvider = ({ children }) => {
  //user state starts as null (no user logged in initially)
  const [user, setUser] = useState(null);

  //useEffect checks our local Storage. Lets users stay logged in between page refreshes (persistence)
  //note for later: login page will need to store user info in local Storage for this to work.
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //what we call on login page after a successful login:
  //takes userData and
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  //what we call on login page after a logout button pushed. resets user and local storage.
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  //renders our usercontext, which wraps the whole app so we have access everywhere
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
