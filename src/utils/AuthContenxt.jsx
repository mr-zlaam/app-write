import { useState, useEffect, useContext, createContext } from "react";
import { Circles } from "react-loader-spinner";

import { account } from "../@appwriteconfig";
import { ID } from "appwrite";
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkUserStatus();
  }, []);
  // business logic
  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      const accountDetails = await account.get();
      console.log(accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.log(error.message);
      return alert(error.message || "something went wrong while login..");
    }
    setLoading(false);
  };
  const logoutUser = async () => {
    try {
      setLoading(true);
      await account.deleteSession("current");
      localStorage.removeItem("cookieFallback");
      return setUser(null);
    } catch (error) {
      console.log(error.message);
      return alert(error.message || "something went wrong please try again");
    } finally {
      setLoading(false);
    }
  };
  const registerUser = async (userInfo) => {
    setLoading(true);
    const { email, password1, name } = userInfo;
    try {
      let res = await account.create(ID.unique(), email, password1, name);
      if (res.$id) {
        await account.createEmailPasswordSession(email, password1);
        // This code automatically set session to local storage
        const accountDetails = await account.get();
        console.log(accountDetails);
        setUser(accountDetails);
      }
    } catch (error) {
      console.log(error.message);
      return alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const checkUserStatus = async () => {
    try {
      const accountDetails = window.localStorage.getItem("cookieFallback");
      setUser(accountDetails);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  const contextData = {
    user,
    setUser,
    loading,
    setLoading,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="center">
          <Circles />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

const UseAuth = () => {
  return useContext(AuthContext);
};
export { UseAuth };
