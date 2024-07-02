import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../constant";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  useEffect(() => {
    if (user) return navigate("/");
  }, [navigate, user]);
  const loginFormRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = loginFormRef.current.email.value;
    const password = loginFormRef.current.password.value;
    const userInfo = { email, password };
    await loginUser(userInfo);
  };
  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={loginFormRef} onSubmit={handleSubmit}>
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
              name="password"
              placeholder="Enter password..."
              required
            />
          </div>

          <div className="form-field-wrapper">
            <input type="submit" value="Login" className="btn" />
          </div>
        </form>

        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
