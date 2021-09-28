import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, signIn } from "../../actions/authActions";
import { useHistory } from "react-router-dom";
import "./AuthPage.scss";
import MessageBox from "../../components/MessageBox/MessageBox";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

function AuthPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [active, setActive] = useState(false);

  const { loading, error, isAuth } = useSelector((state) => state.isAuth);

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const checkPasswordInput = useRef();

  useEffect(() => {
    if (isAuth) {
      history.goBack();
    }
  }, [isAuth, history]);

  const changeActiveComponentState = () => {
    setActive(!active);
  };

  const checkPasswords = (pass1, pass2) => {
    return pass1.length === pass2.length && pass1 == pass2;
  };

  const handleRegisterData = (e) => {
    e.preventDefault();

    if (checkPasswords(passwordInput, checkPasswordInput)) {
      const registerData = {
        name: nameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
      };

      dispatch(register(registerData));
    } else {
      passwordInput.current.value = "";
      checkPasswordInput.current.value = "";
    }
  };

  const handleSignInData = (e) => {
    e.preventDefault();
    if (passwordInput.current.value.length >= 6) {
      const signInData = {
        email: emailInput.current.value,
        password: passwordInput.current.value,
      };
      dispatch(signIn(signInData));
    }
  };

  return (
    <div className="authPage">
      {loading ? <LoadingBar /> : <></>}
      {active ? (
        <div className="register">
          {error ? <MessageBox message={error} variant={"error"} /> : <></>}
          <h3>Register</h3>
          <form className="sign-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                ref={nameInput}
                className="form-control"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                ref={emailInput}
                className="form-control"
                type="email"
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                ref={passwordInput}
                className="form-control"
                type="password"
                placeholder="Password"
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label htmlFor="re-password">Re-password</label>
              <input
                id="re-password"
                ref={checkPasswordInput}
                className="form-control"
                type="password"
                placeholder="Repeat password"
              />
            </div>

            <button
              onClick={(e) => handleRegisterData(e)}
              className="btn btn-outline-primary"
              style={{ marginTop: "30px" }}
              type="submit"
            >
              Register
            </button>
          </form>
          <small>You have already accout ?</small>
          <span onClick={() => changeActiveComponentState()}>
            Sign In here!
          </span>
        </div>
      ) : (
        <div className="signIn">
          {error ? <MessageBox message={error} variant={"error"} /> : <></>}
          <h3>Sign In</h3>
          <form className="form-inline sign-form">
            <div className="form-group ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                ref={emailInput}
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                ref={passwordInput}
                className="form-control"
                type="password"
                placeholder="Password"
              />
            </div>

            <button
              onClick={(e) => handleSignInData(e)}
              className="btn btn-outline-primary"
              type="submit"
              style={{ marginTop: "30px" }}
            >
              Sign In
            </button>
          </form>
          <small>You are new customer ?</small>
          <span onClick={() => changeActiveComponentState()}>
            Register here!
          </span>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
