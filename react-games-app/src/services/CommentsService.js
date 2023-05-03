const BASE_URL = "http://localhost:3030/data/comments";

export const commentCreate = async (token, gameId, comment) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Authorization": token,
        },
        body: JSON.stringify({ gameId, comment }),
    };

    const response = await fetch(BASE_URL, options);
    const result = await response.json();

    return result;
};

export const commentsGet = async (gameId) => {
    const searchQuery = encodeURIComponent(`gameId="${gameId}"`);
    const relationsQuery = encodeURIComponent(`author=_ownerId:users`);
    const response = await fetch(
        `${BASE_URL}?where=${searchQuery}&load=${relationsQuery}`
    );
    try {
        const result = await response.json();
        const comments = Object.values(result);
        return comments;
    } catch (err) {
        return [];
    }
};
