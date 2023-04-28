import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import * as gameService from "./services/GameService";
import * as authService from "./services/AuthService";
import { AuthContext } from "./contexts/AuthContext";

import { Catalogue } from "./components/catalogue/Catalogue";
import { Footer } from "./components/footer/Footer";
import { GameCreate } from "./components/game-create/GameCreate";
import { GameDetails } from "./components/game-details/GameDetails";
import { GameEdit } from "./components/game-edit/GameEdit";
import { Header } from "./components/header/Header";
import { Homepage } from "./components/homepage/Homepage";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});

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

    const contextData = {
        onRegisterSubmit,
        onLoginSubmit,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={contextData}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route
                            path="/game-create"
                            element={
                                <GameCreate onCreateGameSubmit={onCreateSubmitHandler} />
                            }
                        />
                        <Route path="/game-edit" element={<GameEdit />} />
                        <Route
                            path="/login"
                            element={<Login onLoginSubmit={onLoginSubmit} />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/catalogue" element={<Catalogue games={games} />} />
                        <Route path="/catalogue/:gameId" element={<GameDetails />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
