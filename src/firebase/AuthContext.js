import app from "./Config";
import React, {useEffect, useState} from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setUser);
    }, []);

    return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};