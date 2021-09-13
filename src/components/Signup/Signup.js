import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const Signup = (props) => {
  const firebase = useContext(FirebaseContext);

  const data = {
    fistName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, firstName } = loginData;
    firebase
      .signupUser(email, password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          firstName,
          email,
        });
      })
      .then(() => {
        setLoginData({ ...data });
        props.history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const { firstName, lastName, email, password, confirmPassword } = loginData;

  const btn =
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>SIGNUP</button>
    ) : (
      <button>SIGNUP</button>
    );

  // gestion erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}

            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={firstName}
                  type="text"
                  id="firstName"
                  autoComplete="off"
                  required
                />
                <label htmlFor="firstName">First name</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={lastName}
                  type="text"
                  id="lastName"
                  autoComplete="off"
                  required
                />
                <label htmlFor="lastName">Last name</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="confirmPassword">Confirm password</label>
              </div>

              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Already registered? Log in.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
