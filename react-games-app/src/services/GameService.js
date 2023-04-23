const BASE_URL = "http://localhost:3030/jsonstore/games/";

export const getAll = async () => {
    const response = await fetch(BASE_URL);
    try {
        const result = await response.json();
        const games = Object.values(result)
        
        return games

    } catch (error) {
        return {};
    }
};

export const getOne = async ({
    gameId
}) => {
    const response = await fetch(BASE_URL + gameId)
    try {
        const result = await response.json()

        return result

    } catch (error) {
        return {}
    }
}

export const create = async (data) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }
    
    const response = await fetch(BASE_URL, options)
    const result = response.json()

    return result
}