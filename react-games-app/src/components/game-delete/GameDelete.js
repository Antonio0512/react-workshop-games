import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { useForm } from "../../hooks/useForm";
import { useParams } from "react-router-dom";

export const GameDelete = () => {
    const { gameDelete, games, token } = useContext(GameContext);
    const { gameId } = useParams();
    const game = games.find((g) => g._id === gameId);
    const { values, onChangeHandler, onSubmit } = useForm(
        () => gameDelete(token, gameId, values),
        {
            _id: gameId,
            title: game.title || "",
            category: game.category || "",
            maxLevel: game.maxLevel || "",
            imageUrl: game.imageUrl || "",
            summary: game.summary || "",
        }
    );

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Delete Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={onChangeHandler}
                        disabled
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={onChangeHandler}
                        disabled
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        value={values.maxLevel}
                        min="1"
                        onChange={onChangeHandler}
                        disabled
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={onChangeHandler}
                        disabled
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        value={values.summary}
                        id="summary"
                        onChange={onChangeHandler}
                        disabled
                    ></textarea>
                    <input className="btn submit" type="submit" value="Delete Game" />
                </div>
            </form>
        </section>
    );
};
