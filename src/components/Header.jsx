import { Link } from "react-router-dom";
import { useAuth } from "../constant";

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    <>
      {user && (
        <div className="header">
          <div>
            <Link id="header-logo" to="/">
              LOGO
            </Link>
          </div>

          <div className="links--wrapper">
            <>
              <Link to="/" className="header--link">
                Home
              </Link>
              <Link to="/profile" className="header--link">
                Profile
              </Link>

              <button onClick={logoutUser} className="btn">
                Logout
              </button>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
