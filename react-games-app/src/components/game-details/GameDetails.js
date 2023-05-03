import { useEffect, useState, useContext } from "react";

import { Comment } from "./Comment";

import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as gameService from "../../services/GameService";
import * as commentService from "../../services/CommentsService";

export const GameDetails = () => {
    const [game, setGame] = useState({});
    const { gameId } = useParams();
    const { token, userId, isAuthenticated, email } = useContext(AuthContext);

    const isOwner = game._ownerId === userId;

    useEffect(() => {
        Promise.all([
            gameService.getOne(gameId),
            commentService.commentsGet(gameId),
        ]).then(([gameData, comments]) => {
            setGame({
                ...gameData,
                comments,
            });
        });
    }, [gameId]);

    const onCommentSubmit = async (values) => {
        const comment = values.comment;

        try {
            const result = await commentService.commentCreate(token, gameId, {comment});
            
            setGame((state) => ({
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...result,
                        author: {
                            email,
                        },
                    },
                ],
            }));
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

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments &&
                            game.comments.map((x) => (
                                <li key={x._id} className="comment">
                                    <p>
                                        {x.author.email}: {x.comment.comment}
                                    </p>
                                </li>
                            ))}
                    </ul>

                    {!game.comments?.length && <p className="no-comment">No comments.</p>}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalogue/${gameId}/edit`} className="button">
                            Edit
                        </Link>
                        <Link to={`/catalogue/${gameId}/delete`} className="button">
                            Delete
                        </Link>
                    </div>
                )}
            </div>

            {isAuthenticated && <Comment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};
