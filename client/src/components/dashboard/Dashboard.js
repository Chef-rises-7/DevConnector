import React, {useEffect, Fragment } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layouts/Spinner";
import DashboardActions from "./DashboardActions.js";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: {user}, profile: { loading, profile }}) => {

    useEffect(() => {
        getCurrentProfile();
    },[]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>
            Welcome { user && user.name }
        </p>
        { profile !== null ? (
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fas-user-minus"></i>
                    Delete My Account
                </button>
            </Fragment> ) : (<Fragment>
            <p>You have not yet created a profile, click below to create a profile.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>)}
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps,{ getCurrentProfile, deleteAccount })(Dashboard)
