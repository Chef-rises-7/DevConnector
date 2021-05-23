import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth.js";

const Login = ({ login, isAuthenticated }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({email,password});
    console.log("yup biro");
  };

  if(isAuthenticated) {
    history.push("/dashboard");
  };

  return (
    <Fragment>
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Sign Into Your Account
      </p>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => onChange(e)}
            required="true"
          />
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

        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ login })(Login);
