import { createContext } from "react";

import { useNavigate } from "react-router-dom";

import * as authService from "../services/AuthService";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const navigate = useNavigate();

    const onLoginSubmit = async (data, setIsLoginFailed) => {
        try {
            const result = await authService.login(data);
            setAuth(result);
            setIsLoginFailed(false);

            navigate("/catalogue");
        } catch (err) {
            setIsLoginFailed(true);
        }
    };
    const onRegisterSubmit = async (data, setIsRegisterFailed) => {
        try {
            const result = await authService.register(data);
            setAuth(result);
            setIsRegisterFailed(false);

            navigate("/catalogue");
        } catch (err) {
            setIsRegisterFailed(true);
        }
    };

    const onLogout = async () => {
        setAuth({});
    };

    const authContextData = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogout,
        token: auth.accessToken,
        userId: auth._id,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={authContextData}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
