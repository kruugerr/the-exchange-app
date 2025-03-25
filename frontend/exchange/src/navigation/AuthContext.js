import React, { createContext, useState } from 'react';

// Creates global store for the authentication state (allows global login status)
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Holds current token
    const [userToken, setUserToken] = useState(null); // null = not logged in

    //Exposes login and logout functinos so any provider can access it
    const login = (token) => setUserToken(token);
    const logout = () => setUserToken(null);

    return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};