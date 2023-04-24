import { useState, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import { Catalogue } from "./components/catalogue/Catalogue";
import { Footer } from "./components/footer/Footer";
import { GameCreate } from "./components/game-create/GameCreate";
import { GameDetails } from "./components/game-details/GameDetails";
import { GameEdit } from "./components/game-edit/GameEdit";
import { Header } from "./components/header/Header";
import { Homepage } from "./components/homepage/Homepage";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";

import * as gameService from "./services/GameService";

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll().then((result) => {
            setGames(result);
        });
    }, []);

    const onCreateSubmitHandler = async (data) => {
        await gameService.create(data).then((newGame) => {
            setGames((state) => [...state, newGame]);
            navigate("/catalogue");
        });
    };

    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route
                        path="/game-create"
                        element={<GameCreate onCreateGameSubmit={onCreateSubmitHandler} />}
                    />
                    <Route path="/game-edit" element={<GameEdit />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/catalogue" element={<Catalogue games={games} />} />
                    <Route path="/catalogue/:gameId" element={<GameDetails />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
