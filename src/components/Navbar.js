import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from '../api';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import '../App.css';

function Navbar({loggedInUser, setCurrentUser}) {
    const logoutUser = async () => {
        await logout();
        setCurrentUser(null);
    }

    const { data, isLoading, errorMessage } = useOpenWeather({
      key: '199bd7357f26d17b0ad408717dede67f',
      lat: '38.72927824720325', 
      lon: '-9.138576062552916',
      lang: 'en',
      unit: 'metric', // values are (metric, standard, imperial)
    });
    
  return loggedInUser ? (
    <>
    <div className="ReactWeather">
    <ReactWeather 
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Lisbon"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
    </div>

    <h3>Welcome {loggedInUser.username}
    &nbsp; &nbsp;
    <NavLink to="/">
            <button onClick={logoutUser}>Logout</button>
        </NavLink>
    </h3>
    <ul>
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/tasks">
          Tasks
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/tasks/add">
          Add a Task
        </NavLink>
      </li>
    </ul>
    
    </>
  ) : (
    <>
        <div className="ReactWeather"><ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Lisbon"
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast
        />
        </div>
    <ul>
    
    <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/signup">
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
          Login with Google
        </NavLink>
      </li>
  </ul>
  </>
  )
}
export default Navbar;