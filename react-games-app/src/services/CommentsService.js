const BASE_URL = "http://localhost:3030/jsonstore/comments";

export const commentCreate = async (data) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(BASE_URL, options);
    const result = await response.json();

    return result;
};

export const getCommentsForGame = async ({ gameId }) => {
    const query = encodeURIComponent(`gameId="${gameId}"`);
    const response = await fetch(`${BASE_URL}?where=${query}`);
    try {
        const result = await response.json();
        const comments = Object.values(result);
        return comments;
    } catch (err) {
        return []
    } 
};