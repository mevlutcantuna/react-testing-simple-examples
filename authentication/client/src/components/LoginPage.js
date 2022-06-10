import { useState } from "react";
import "../styles/auth.css";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";

const LoginPage = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    if (inputs.email === "" || inputs.password === "") {
      return setError("Please provide all inputs...");
    }

    setLoading(true);

    try {
      const { data } = await login(inputs);
      localStorage.setItem("user", data.user._id);
      setLoading(false);
      navigate("../", { replace: true });
    } catch (error) {
      setLoading(false);
      return setError(error.response.data.errorMessage);
    }
  };

  return (
    <div className="container">
      <span>Cennet</span>
      <h1 className="container__title">Login</h1>
      <form onSubmit={onLoginSubmit} className="container__form">
        <input
          value={inputs.email}
          onChange={handleInputsChange}
          name="email"
          className="form-item"
          type="email"
          placeholder="Email"
        />
        <input
          value={inputs.password}
          onChange={handleInputsChange}
          name="password"
          className="form-item"
          type="password"
          placeholder="Password"
        />
        <button className="form-button" type="submit">
          Login
        </button>
        <div className="form-notification">
          {loading && "Loading..."} {error && error}
        </div>
      </form>
      <div>
        <Link to="/signup">Go To Signup</Link>
      </div>
    </div>
  );
};

export default LoginPage;
