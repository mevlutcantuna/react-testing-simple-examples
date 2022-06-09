import { useState } from "react";
import "../styles/auth.css";

import { Link } from "react-router-dom";

const LoginPage = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="container__title">Login</h1>
      <form className="container__form">
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
      </form>
      <div>
        <Link to="/signup">Go To Signup</Link>
      </div>
    </div>
  );
};

export default LoginPage;
