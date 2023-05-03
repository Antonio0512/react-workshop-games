import { Route, Routes,  } from "react-router-dom";


import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";

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

function App() {

    return (
        <AuthProvider>
            <div id="box">
                <Header />
                <main id="main-content">
                    <GameProvider>
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
                                element={<Login />}
                            />
                            <Route path="/register" element={<Register />} />
                            <Route path="/catalogue" element={<Catalogue />} />
                            <Route path="/catalogue/:gameId" element={<GameDetails />} />
                        </Routes>
                    </GameProvider>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
