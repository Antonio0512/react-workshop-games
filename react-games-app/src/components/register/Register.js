import { useContext, useState } from "react";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

const registeFormKeys = {
    EMAIL: "email",
    PASSWORD: "password",
    "CONFIRM-PASSWORD": "confirm-password",
};

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const [isRegisterFailed, setIsRegisterFailed] = useState(false);
    const { values, onChangeHandler, onSubmit } = useForm(
        () => {
            if (
                values[registeFormKeys.PASSWORD] !==
                values[registeFormKeys["CONFIRM-PASSWORD"]]
            ) {
                setIsRegisterFailed(true);
                return;
            }
            onRegisterSubmit(values, setIsRegisterFailed
            );
        },
        {
            [registeFormKeys.EMAIL]: "",
            [registeFormKeys.PASSWORD]: "",
            [registeFormKeys["CONFIRM-PASSWORD"]]: "",
        }
    );

    return (
        <section id="register-page" className="content auth">
            <form id="register" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        value={values[registeFormKeys.EMAIL]}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={values[registeFormKeys.PASSWORD]}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={values[registeFormKeys["CONFIRM-PASSWORD"]]}
                        onChange={onChangeHandler}
                    />

                    <input className="btn submit" type="submit" value="Register" />
                    {isRegisterFailed && (
                        <div style={{ marginTop: "20px" }}>
                            <p style={{ color: "red", fontSize: "20px" }}>
                                Make sure your email is correct and your Passwords match!
                            </p>
                        </div>
                    )}

                    <p className="field">
                        <span>
                            If you already have profile click <a href="#">here</a>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
};
