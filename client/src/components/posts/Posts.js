import React, { Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { getPosts } from '../../actions/post'
import Spinner from '../layouts/Spinner'
import PostItem from './PostItem'

const Posts = ({getPosts, post: {loading, posts}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])
    return (
        <Fragment>
            {loading ? (<Spinner />) : (<Fragment>
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fas-user"></i> Welcome to the community
                </p>
                <div className="posts">
                    {
                        posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))
                    }
                </div>
            </Fragment>)}
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps,{getPosts})(Posts)
