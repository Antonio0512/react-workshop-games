import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/AuthService";

import { AuthContext } from "../../contexts/AuthContext";

export const Logout = () => {
    const navigate = useNavigate();
    const { token, onLogout } = useContext(AuthContext);
    useEffect(() => {
        authService
            .logout({token})
            .then(() => {
                onLogout();
                navigate("/");
            })
            .catch((err) => {
                alert(err)
                navigate("/");
            });
    });
    return null;  
};