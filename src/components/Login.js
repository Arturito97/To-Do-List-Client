import React from 'react';
import { NavLink } from 'react-router-dom';
import { login } from '../api';
import '../App.css';

class Login extends React.Component {
    state={
        username: '',
        password: '',
    };
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value})
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        const response = await login(username, password);
        this.props.setCurrentUser(response.data);
        this.props.history.push('/tasks');
    }

    render() {
        const {username, password} = this.state;
        return (
        <>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange}/>
          <button>Login</button>
        </form>
        <p>
          Don't have an account?
          <NavLink to={"/signup"}> Signup</NavLink>
        </p>
      </>

        )
    }
}

export default Login;