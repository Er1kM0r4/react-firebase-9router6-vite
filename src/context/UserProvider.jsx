import { createContext, useState } from "react";

export const UserContexts = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  return (
    <UserContexts.Provider value={{ user, setUser }}>
      {props.children}
    </UserContexts.Provider>
  );
};
