import { useState, useEffect } from "react";

import * as gameService from "../services/GameService"

import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate()

    const {token} = useContext(AuthContext)

    useEffect(() => {
        gameService.getAll().then((result) => {
            setGames(result);
        });
    }, []);

    const gameAdd = async (data) => {
        await gameService.create(data, token).then((newGame) => {
            setGames((state) => [...state, newGame]);

            navigate("/catalogue");
        });
    };

    const gameEdit = async (gameId, data) => {
        await gameService.edit(token, gameId, data);

        setGames((state) => [...state]);

        navigate(`/catalogue/${gameId}`);
    };

    const gameDelete = async (gameId) => {
        await gameService.deleteGame(token, gameId);

        setGames((state) => state.filter((x) => x._id !== gameId));

        navigate(`/catalogue`);
    };

    const gameContextData = {
        token,
        games,
        gameAdd,
        gameEdit,
        gameDelete,
    };

    return (
        <>
            <GameContext.Provider value={gameContextData}>
                {children}
            </GameContext.Provider>

        </>
    )
};
