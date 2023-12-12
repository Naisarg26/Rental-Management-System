//components/Header.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/Header2/Header2.css"
// functions
import { logout } from "../api/user";
const Header = (type) => {
  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // Function to retrieve user data from localStorage
  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("profile");
  
    // Check if storedUser is not null or undefined
    if (storedUser !== null && storedUser !== undefined) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        // Handle JSON parsing error (e.g., log it or show an error message)
        console.error("Error parsing stored user data:", error);
      }
    } else {
      // No stored user data, set user state to null or any default value
      setUser(null);
    }
  };
  

  useEffect(() => {
    // Retrieve user data from localStorage when the component mounts
    getUserFromLocalStorage();
  },  [location]);

  const Logout = () => {
    dispatch({ type: "LOGOUT" });

    // Clear user data from localStorage
    localStorage.removeItem("profile");

    // Update the user state to null
    setUser(null);

    // Navigate to the home page
    navigate("/");
  };
  const handleLogout = (e) => {
		e.preventDefault();

		logout()
			.then((res) => {
				toast.success(res.message);
				// set user to null
				setUser(null);
				// redirect the user to login
				navigate("/login");
			})
			.catch((err) => console.error(err));
	};

	return (
    <div className="maincontainer">
		  <nav className="navbar navbar-expand-lg navbar-dark crimson-red">
        <Link className="navbar-brand" to="/">
          Rental Voyage
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${classes.toolbar}`} id="navbarNav">
           <ul className="navbar-nav ml-auto">
              {user ? (
                <li className="nav-item">
                  <div className={`nav-item ${classes.profile}`}>
                    <Avatar
                      className={`nav-item ${classes.avatar}`}
                      alt={user?.result?.name || ""}
                      src={user?.result?.imageUrl || ""}
                    >
                      {(user?.result?.name || "").charAt(0)}
                    </Avatar>
                    <Typography className={`nav-item ${classes.userName}`} variant="h6">
                        {user?.result?.name || ""}
                    </Typography>
                    <Button
                      variant="contained"
                      className={`nav-item ${classes.logoutButton}`}
                      color="secondary"
                      onClick={user?.result ? Logout : handleLogout}
                    >
                      LOGOUT
                    </Button>
                  </div>
                </li>
      
              ) : (
                <>
                    <li className="nav-item ">
                      <Link className="nav-link" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
        
                </>
      
                  )}
            </ul>
        </div>
        </nav>
</div>
);
 };
export default Header;	