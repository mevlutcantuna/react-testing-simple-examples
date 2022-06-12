import { useState } from "react";
import "../styles/auth.css";

import { Link, useNavigate } from "react-router-dom";
import { signup } from "../lib/api";

const SignupPage = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    if (
      inputs.fullName === "" ||
      inputs.email === "" ||
      inputs.password === ""
    ) {
      setLoading(false);
      return setError("Please provide all inputs...");
    }

    setLoading(true);

    try {
      await signup(inputs);
      setLoading(false);
      return navigate("../login", { replace: true });
    } catch (error) {
      setLoading(false);
      return setError(error.response.data.errorMessage);
    }
  };

  return (
    <div className="container">
      <h1 className="container__title">Signup</h1>
      <form onSubmit={onSignupSubmit} className="container__form">
        <input
          value={inputs.fullName}
          onChange={handleInputsChange}
          name="fullName"
          type="text"
          placeholder="FullName"
          className="form-item"
        />
        <input
          value={inputs.email}
          onChange={handleInputsChange}
          name="email"
          type="email"
          placeholder="Email"
          className="form-item"
        />
        <input
          value={inputs.password}
          onChange={handleInputsChange}
          name="password"
          type="password"
          placeholder="Password"
          className="form-item"
        />
        <button data-cy="signup-btn" type="submit" className="form-button">
          Signup
        </button>
        <div className="form-notification">
          {loading && "Loading..."} {error && error}
        </div>
      </form>
      <div>
        <Link to="/login">Go To Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
