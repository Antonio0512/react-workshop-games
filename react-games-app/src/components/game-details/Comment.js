import { useForm } from "../../hooks/useForm";

export const Comment = ({ onCommentSubmit }) => {

    const { values, onChangeHandler, onSubmit } = useForm(
        () => onCommentSubmit(values),
        { comment: "" }
    );

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={onSubmit}>
                <textarea
                    name="comment"
                    placeholder="Comment..."
                    value={values["comment"]}
                    onChange={onChangeHandler}
                ></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    );
};
