import { useState } from "react";
import "../styles/auth.css";

import { Link } from "react-router-dom";

const SignupPage = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="container__title">Signup</h1>
      <form className="container__form">
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
        <button type="submit" className="form-button">
          Signup
        </button>
      </form>
      <div>
        <Link to="/login">Go To Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
