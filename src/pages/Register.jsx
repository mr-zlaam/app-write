import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../constant";

const Register = () => {
  const registerFormRef = useRef();
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = registerFormRef.current.name.value;
    const email = registerFormRef.current.email.value;
    const password1 = registerFormRef.current.password1.value;
    const password2 = registerFormRef.current.password2.value;
    if (password1 !== password2) return alert("passwords must be same");
    const userInfo = { name, email, password1, password2 };
    registerUser(userInfo);
    return navigate("/");
  };
  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={registerFormRef} onSubmit={handleSubmit}>
          <div className="form-field-wrapper">
            <label>Name:</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter name..."
            />
          </div>

          <div className="form-field-wrapper">
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>

          <div className="form-field-wrapper">
            <label>Password:</label>
            <input
              type="password"
              name="password1"
              placeholder="Enter password..."
            />
          </div>

          <div className="form-field-wrapper">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm password..."
            />
          </div>

          <div className="form-field-wrapper">
            <input type="submit" value="Register" className="btn" />
          </div>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
