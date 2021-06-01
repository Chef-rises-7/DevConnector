import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { addUnlike, addLike, deletePost } from '../../actions/post'

const PostItem = ({addUnlike, addLike, deletePost, showActions, auth, post: {
    _id,text,name,avatar,comments,likes,date,user
}}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img src={avatar} alt="" className="round-img" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>
                {
                    showActions && (
                        <Fragment>
                            <button onClick={() => addLike(_id)} className="btn btn-light">
                                <i className="fas fa-thumbs-up"></i>
                                {likes.length > 0 && (<span>{likes.length}</span>)}
                            </button>
                            <button onClick={() => addUnlike(_id)} className="btn btn-light">
                                <i className="fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${_id}`} className="btn btn-primary">
                                Discussion {comments.length > 0 && (<span className="comment-count">{comments.length}</span>)} 
                            </Link>
                            {!auth.loading && user === auth.user._id && (
                                <button onClick={() => deletePost(_id)} className="btn btn-danger">
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                        </Fragment>
                    )
                }
                
            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addUnlike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showActions: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps,{ addUnlike, addLike, deletePost })(PostItem)
