const BASE_URL = "http://localhost:3030/data/games/";

export const getAll = async () => {
    const response = await fetch(BASE_URL);
    try {
        const result = await response.json();
        const games = Object.values(result);

        return games;
    } catch {
        return [];
    }
};

export const getOne = async (gameId) => {
    const response = await fetch(BASE_URL + gameId);
    try {
        const result = await response.json();

        return result;
    } catch {
        return {};
    }
};

export const create = async (data, token) => {
    const options = {
        method: "POST",
        headers: {
            "X-Authorization": token,
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(BASE_URL, options);
    try {
        const result = await response.json();
        return result;
    } catch {
        return [];
    }
};

export const edit = async (token, gameId, data) => {
    const options = {
        method: "PUT",
        headers: {
            "X-Authorization": token,
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(BASE_URL + gameId, options);

    try {
        const result = await response.json();
        return result;
    } catch {
        throw new Error();
    }
};

export const deleteGame = async (token, gameId) => {
    const options = {
        method: "DELETE",
        headers: {
            "X-Authorization": token,
        },
    };

    await fetch(BASE_URL + gameId, options);
};

export const addComment = async (token, data) => {
    const options = {
        method: "POST",
        headers: {
            "X-Authorization": token,
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const response = await fetch("http://localhost:3030/data/comments", options);

    try {
        const result = await response.json();
        return result;
    } catch {
        throw new Error();
    }
};

export const getComments = async () => {
    const response = await fetch(`http://localhost:3030/data/comments`);

    try {
        const result = await response.json();
        return result;
    } catch {
        throw new Error();
    }
};
