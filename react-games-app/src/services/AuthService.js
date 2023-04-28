const BASE_URL = "http://localhost:3030/users/";

export const login = async (loginData) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(loginData),
    };

    const response = await fetch(BASE_URL + "login", options);
    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const register = async (registerData) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(registerData),
    };

    const response = await fetch(BASE_URL + "register", options);
    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};
