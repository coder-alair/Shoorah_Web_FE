import React, { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../../api";
import { errorToast } from "../../utils/helper";

export const UserContext = createContext();

export function useAuth() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);

    let userData = localStorage.getItem('userData');
    let data = JSON.parse(userData);

    useEffect(() => {

        if (userData) {
            Api.getUserProfile(data.id).then((res) => {
                if (res.data.meta.code == 1) {
                    setUser(res.data.data);
                }
                else {
                    errorToast(res.data.meta.message);
                }
            }).catch(err => {
                console.log(err)
            });
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser, disclaimerAgreed, setDisclaimerAgreed }}>
            {children}
        </UserContext.Provider>
    );
}








