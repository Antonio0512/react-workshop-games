const BASE_URL = "http://localhost:3030/users/";

export const login = async (loginData) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(loginData),
        };

        const response = await fetch(BASE_URL + "login", options);
        const result = await response.json();

        return result;
    } catch (err) {
        throw err;
    }
};

export const register = async (registerData) => {
    try {
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
            if (response.status === 409) {
                throw new Error("")
                
            } else {
                throw result;
            }
        }

        return result;
    } catch {
        throw new Error("");
    }
};

export const logout = async ({token}) => {
    try {
        const response = await fetch(BASE_URL + "logout", {
            headers: {
                "X-Authorization": token,
            },
        });

        return response;
    } catch {
        throw new Error("Something occured, please try again.")
    }
};
