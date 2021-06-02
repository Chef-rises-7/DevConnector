import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import {addComment, removeComment} from "../../actions/post";

const CommentFrom = ({postId, addComment, removeComment}) => {
    const [text, setText] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        addComment(postId,{text});
        setText("");
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a comment</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className="form my-1">
                <textarea name="text" onChange={(e) => setText(e.target.value)} value={text} cols="30" rows="5" placeholder="Create a post"></textarea>
                <input value="submit" type="submit" className="btn btn-dark my-1" />
            </form>
        </div>
    )
}

CommentFrom.propTypes = {
    addComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
}

export default connect(null, { removeComment, addComment })(CommentFrom)
