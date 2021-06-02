import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getPost } from "../../actions/post";
import Spinner from "../layouts/Spinner";
import PostItem from '../posts/PostItem';
import CommentFrom from './CommentFrom';
import CommentItem from "./CommentItem";

const Post = ({getPost, post: {loading,post}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    },[getPost, match.params.id]);

    return (
        <Fragment>
            {loading || post===null ? <Spinner/> : (
                <Fragment>
                    <Link to="/posts" className="btn">Go To Posts</Link>
                    <PostItem post={post} showActions={false} />
                    <CommentFrom postId={post._id} />
                    <div className="comments">
                    {
                        post.comments.map( comment => (
                            <CommentItem postId={post._id} comment={comment} />
                        ))
                    }
                    </div>
                    
                </Fragment>
            )}
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
})
export default connect(mapStateToProps,{ getPost })(Post)
