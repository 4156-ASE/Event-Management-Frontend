import { Link } from 'react-router-dom';
import { CgEventbrite } from 'react-icons/cg';
import { FiCheckSquare, FiLogIn } from 'react-icons/fi';
import {
  IoTodayOutline,
  IoAddCircleOutline,
  IoPersonCircleOutline,
  IoLogOut,
} from 'react-icons/io5';
import { Fragment, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContextProvider';
import axios from 'axios';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
    const resp = await axios.get('/auth/signout', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
  });
      if (resp.data.status === 'success') {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        setAuth(localStorage.getItem('token'))
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Log Out not Succeeded");
    }
  };

  const unauthLinks = (
    <ul>
      <li>
        <Link to="/signin">
          <div className="center">
            <FiLogIn size={30} />
            <div className="center p-title">
              <span>Sign In</span>
            </div>
          </div>
        </Link>
        <Link to="/signup">
          <div className="center">
            <FiCheckSquare size={30} />
            <div className="center p-title">
              <span>Register</span>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
  
  const authLinks = (
    <ul>
      <li>
        <Link to="/create">
          <div className="center">
            <IoAddCircleOutline size={30} />
            <div className="center p-title">
              <span>Create an Reservation</span>
            </div>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/myevents">
          <div className="center">
            <IoTodayOutline size={30} />
            <div className="center p-title">
              <span>Manage My Reservations</span>
            </div>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/mytickets">
          <div className="center">
            <IoPersonCircleOutline size={30} />
            <div className="center p-title">
              <span>My Tickets</span>
            </div>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <div className="center">
            <IoPersonCircleOutline size={30} />
            <div className="center p-title">
              <span>Profile</span>
            </div>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/">
          <div className="center" onClick={handleSignOut}>
            <IoLogOut size={30} />
            <div className="center p-title">
              <span>Logout</span>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
  const adminLinks = (
    <ul>
      <li>
        <Link to="/profile">
          <div className="center">
            <IoPersonCircleOutline size={30} />
            <div className="center p-title">
              <span>Profile</span>
            </div>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/">
          <div className="center" onClick={handleSignOut}>
            <IoLogOut size={30} />
            <div className="center p-title">
              <span>Logout</span>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <Link to="/">
        <div className="center">
          <span className="main-title">Restaurant Reservation Organizer</span>
        </div>
      </Link>
      {<Fragment>{auth && localStorage.getItem('role') === 'admin' ? adminLinks :  auth && localStorage.getItem('role') === 'regular' ? authLinks : unauthLinks}</Fragment>}
    </nav>
  );
};

export default Navbar;
