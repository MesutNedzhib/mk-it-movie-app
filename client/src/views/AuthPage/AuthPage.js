import React, { useRef, useState } from "react";
import "./AuthPage.scss";

function AuthPage() {
  const [active, setActive] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();

  return (
    <div className="authPage">
      {!active ? (
        <div className="signIn">
          <h3>Sign In</h3>
          <form className="form-inline">
            <input className="form-control" type="email" placeholder="Email" />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <button className="btn btn-outline-primary">Sign In</button>
          </form>
          <small>You are new customer ?</small>
          <span onClick={() => setActive(true)}>Register here!</span>
        </div>
      ) : (
        <div className="register">
          <h3>Register</h3>
          <form className="form-inline">
            <input className="form-control" type="email" placeholder="Email" />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <button className="btn btn-outline-primary">Register</button>
          </form>
          <small>You have already accout ?</small>
          <span onClick={() => setActive(false)}>Sign In here!</span>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
