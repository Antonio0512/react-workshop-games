import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import * as gameService from "./services/GameService";
import * as authService from "./services/AuthService";

import { AuthContext } from "./contexts/AuthContext";
import { GameContext } from "./contexts/GameContext";

import { Catalogue } from "./components/catalogue/Catalogue";
import { Footer } from "./components/footer/Footer";
import { GameCreate } from "./components/game-create/GameCreate";
import { GameDetails } from "./components/game-details/GameDetails";
import { GameEdit } from "./components/game-edit/GameEdit";
import { GameDelete } from "./components/game-delete/GameDelete";
import { Header } from "./components/header/Header";
import { Homepage } from "./components/homepage/Homepage";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Logout } from "./components/logout/Logout";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useLocalStorage("auth", {});

    useEffect(() => {
        gameService.getAll().then((result) => {
            setGames(result);
        });
    }, []);

    const gameAdd = async (data, token) => {
        await gameService.create(data, token).then((newGame) => {
            setGames((state) => [...state, newGame]);

            navigate("/catalogue");
        });
    };

    const gameEdit = async (token, gameId, data) => {
        await gameService.edit(token, gameId, data);

        setGames((state) => [...state]);

        navigate(`/catalogue/${gameId}`);
    };

    const gameDelete = async (token, gameId) => {
        await gameService.deleteGame(token, gameId);

        setGames((state) => state.filter(x => x._id !== gameId));

        navigate(`/catalogue`)
    };

    const onLoginSubmit = async (data, setIsLoginFailed) => {
        try {
            const result = await authService.login(data);
            setAuth(result);
            setIsLoginFailed(false);

            navigate("/catalogue");
        } catch (err) {
            setIsLoginFailed(true);
        }
    };

    const onRegisterSubmit = async (data, setIsRegisterFailed) => {
        try {
            const result = await authService.register(data);
            setAuth(result);
            setIsRegisterFailed(false);

            navigate("/catalogue");
        } catch (err) {
            setIsRegisterFailed(true);
        }
    };

    const onLogout = async () => {
        setAuth({});
    };

    const authContextData = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogout,
        token: auth.accessToken,
        userId: auth._id,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    const gameContextData = {
        token: auth.accessToken,
        games,
        gameAdd,
        gameEdit,
        gameDelete
    };

    return (
        <AuthContext.Provider value={authContextData}>
            <div id="box">
                <Header />
                <main id="main-content">
                    <GameContext.Provider value={gameContextData}>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/game-create" element={<GameCreate />} />
                            <Route path="/catalogue/:gameId/edit" element={<GameEdit />} />
                            <Route
                                path="/catalogue/:gameId/delete"
                                element={<GameDelete />}
                            />
                            <Route path="/logout" element={<Logout />} />
                            <Route
                                path="/login"
                                element={<Login onLoginSubmit={onLoginSubmit} />}
                            />
                            <Route path="/register" element={<Register />} />
                            <Route path="/catalogue" element={<Catalogue />} />
                            <Route path="/catalogue/:gameId" element={<GameDetails />} />
                        </Routes>
                    </GameContext.Provider>
                </main>

                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
