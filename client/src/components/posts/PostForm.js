import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { addPost } from "../../actions/post"


const PostForm = ({addPost}) => {

    const [text, setText] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        addPost({text});
        setText("");
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>say something....</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className="form my-1">
                <textarea name="text" onChange={(e) => setText(e.target.value)} value={text} cols="30" rows="5" placeholder="Create a post"></textarea>
                <input value="submit" type="submit" className="btn btn-dark my-1" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)
