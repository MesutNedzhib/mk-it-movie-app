import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, signIn } from "../../actions/authActions";
import { useHistory } from "react-router-dom";
import "./AuthPage.scss";

function AuthPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [active, setActive] = useState(false);

  const { isAuth } = useSelector((state) => state.isAuth);

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const checkPasswordInput = useRef();

  useEffect(() => {
    if (isAuth) {
      history.goBack();
    }
  }, [isAuth]);

  const handleRegisterData = (e) => {
    e.preventDefault();

    if (
      passwordInput.current.value === checkPasswordInput.current.value &&
      passwordInput.current.value.length >= 6
    ) {
      const registerData = {
        name: nameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
      };

      dispatch(register(registerData));
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
      {active ? (
        <div className="register">
          <h3>Register</h3>
          <form className="form-inline">
            <input
              ref={nameInput}
              className="form-control"
              type="text"
              placeholder="Name"
            />
            <input
              ref={emailInput}
              className="form-control"
              type="email"
              placeholder="Email"
            />
            <input
              ref={passwordInput}
              className="form-control"
              type="password"
              placeholder="Password"
              min="6"
            />
            <input
              ref={checkPasswordInput}
              className="form-control"
              type="password"
              placeholder="Repeat password"
            />
            <button
              onClick={(e) => handleRegisterData(e)}
              className="btn btn-outline-primary"
              type="submit"
            >
              Register
            </button>
          </form>
          <small>You have already accout ?</small>
          <span onClick={() => setActive(false)}>Sign In here!</span>
        </div>
      ) : (
        <div className="signIn">
          <h3>Sign In</h3>
          <form className="form-inline">
            <input
              ref={emailInput}
              className="form-control"
              type="email"
              placeholder="Email"
            />
            <input
              ref={passwordInput}
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <button
              onClick={(e) => handleSignInData(e)}
              className="btn btn-outline-primary"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <small>You are new customer ?</small>
          <span onClick={() => setActive(true)}>Register here!</span>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
