import { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { GameContext } from "../../contexts/GameContext";
import * as gameService from "../../services/GameService";
import { useForm } from "../../hooks/useForm";

export const GameDetails = () => {
    const [game, setGame] = useState({});
    const { token } = useContext(GameContext);
    const {gameId} = useParams();

    useEffect(() => {
        gameService.getOne(gameId).then((result) => {
            setGame(result);
        });
    }, [gameId]);

    useEffect(() => {
        gameService
            .getComments(gameId)
            .then((result) => {
                setGame((state) => ({ ...state, comments: result }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [gameId]);

    const { values, onChangeHandler, onSubmit } = useForm(
        () => onCommentSubmit(values),
        { username: "", comment: "" }
    );

    const onCommentSubmit = async () => {
        const username = values.username;
        const comment = values.comment;

        try {
            const result = await gameService.addComment(token, {
                username,
                comment,
            });
            setGame((state) => ({ ...state, comments: [...state.comments, result] }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments &&
                            Object.values(game.comments).map((x) => (
                                <li key={x._id} className="comment">
                                    <p>
                                        {x.username}: {x.comment}
                                    </p>
                                </li>
                            ))}
                    </ul>

                    {!game.comments && <p className="no-comment">No comments.</p>}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
            
                <div className="buttons">
                    <Link to={`/catalogue/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to={`/catalogue/${gameId}/delete`} className="button">
                        Delete
                    </Link>
                </div>
            </div>

            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username..."
                        value={values["username"]}
                        onChange={onChangeHandler}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment..."
                        value={values["comment"]}
                        onChange={onChangeHandler}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    );
};
