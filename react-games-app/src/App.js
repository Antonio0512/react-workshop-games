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
    return (

        <div id="box">

            <Header />

            <main id="main-content">
                {/* <Homepage /> */}
                {/* <Login /> */}
                {/* <Register /> */}
                {/* <GameCreate /> */}
                {/* <GameEdit /> */}
                {/* <GameDetails /> */}
                <Catalogue />
            </main>

            <Footer />

        </div>


    );
}

export default App;
