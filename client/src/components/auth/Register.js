import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert.js";
import { register } from "../../actions/auth.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Register = ({ setAlert,register, isAuthenticated }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const username = name;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password not matched biro", "danger");
    } else {
      register({username,email,password});
      console.log("yup biro");
    }
  };

  if(isAuthenticated) {
    history.push("/dashboard");
  };

  return (
    <Fragment>
      <h1 class="large text-primary">Sign Up</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Create Your Account
      </p>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => onChange(e)}
            required="true"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => onChange(e)}
            required="true"
          />
          <small class="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => onChange(e)}
            minlength="6"
            required="true"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={(e) => onChange(e)}
            minlength="6"
            required="true"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
