// Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuthContext from "../../Hook/useAuthContext";
import Logo from "../Logo/Logo";
import Container from "../Container/Containar";
import { FiLogIn, FiLogOut } from "react-icons/fi";
const Navbar = () => {
  const { user, signOutUser } = useAuthContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    signOutUser().then(() => navigate("/login")).catch(console.error);
  };

  const navLinks = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/community'>Community</NavLink></li>
      <li><NavLink to='/aboutUs'>About Us</NavLink></li>
      <li><NavLink to='/allTrips'>All Trips</NavLink></li>
      {user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-bold ${scrolled ? 'font-medium bg-white shadow-md' : 'bg-transparent'}`}>
      <Container>
        <div className="navbar max-w-7xl mx-auto px-4 py-3">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 z-50">
                {navLinks}
              </ul>
            </div>
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          <div className="navbar-end gap-3">
            {user ? (
              <>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user?.photoURL}
                  alt="Profile"
                  title={user?.displayName}
                />
                <Link onClick={handleLogout} className="flex items-center gap-1">Logout<FiLogOut /></Link>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-1"><FiLogIn />Login</Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
