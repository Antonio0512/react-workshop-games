import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

const loginFormKeys = {
    EMAIL: "email",
    PASSWORD: "password",
};

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const [isLoginFailed, setIsLoginFailed] = useState(false);

    const { values, onChangeHandler, onSubmit } = useForm(
        () => onLoginSubmit(values, setIsLoginFailed),
        {
            [loginFormKeys.EMAIL]: "",
            [loginFormKeys.PASSWORD]: "",
        }
    );

    return (
        <section id="login-page" className="auth">
            <form id="login" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name={loginFormKeys.EMAIL}
                        placeholder="Sokka@gmail.com"
                        value={values[loginFormKeys.EMAIL]}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name={loginFormKeys.PASSWORD}
                        value={values[loginFormKeys.PASSWORD]}
                        onChange={onChangeHandler}
                    />

                    <input type="submit" className="btn submit" value="Login" />
                    {isLoginFailed && (
                        <div style={{marginTop: "20px"}}>
                            <p style={{ color: "red", fontSize: '20px' }}>
                                Your username and password don't match!
                            </p>
                        </div>
                    )}
                    <p className="field">
                        <span>
                            If you don't have profile click <a href="#">here</a>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
};
