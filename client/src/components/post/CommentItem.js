import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { removeComment } from '../../actions/post'

const CommentItem = ({auth,removeComment,postId,comment: {
    _id, text, avatar, name, user, date
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
                <p className="post-date">Commented on <Moment format="YYYY/MM/DD">{date}</Moment></p>
                {!auth.loading && user === auth.user._id && (
                    <button onClick={() => removeComment(postId,_id)} className="btn btn-danger">
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps,{ removeComment })(CommentItem)
