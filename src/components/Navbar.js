import React from "react";
import { NavLink } from "react-router-dom";
import { logout, uploadFile } from '../api';
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
    <br />
      <marquee behavior="scroll" direction="left" ><h3 onClick={logoutUser} className="Welcome">Welcome {loggedInUser.username}! &nbsp;
      <NavLink>
        <img className="logoutImg" onClick={logoutUser} src="/logout-2432055-2058929.png"/>
      </NavLink></h3>
      </marquee>
      
        <br />
        <br />
    
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
        <br />
        </div>
    <ul>
    <br />
    <br />
      <li className="listLoginSignup">
        <NavLink activeStyle={{ color: "red" }} exact to="/login">
          <img className="LoginImg" src="/Member-Login-Button-PNG-Image.png" />
        </NavLink>
      </li>
      <br/>
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
          <img className="GoogleImg" src="/create-apple-google-signin-buttons-quick-dirty-way-google.png" />
        </NavLink>
      </li>
  </ul>
  </>
  )
}
export default Navbar;