import React from 'react';
import { NavLink } from 'react-router-dom';
import { signup, login } from '../api';
import '../App.css';

class Signup extends React.Component {
    state={
        username: '',
        email: '',
        password: '',
    };
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value})
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const {username, email, password} = this.state;
        await signup(username, email, password);
        const response = await login(username, password)
        this.props.setCurrentUser(response.data);
        this.props.history.push('/tasks');

    }

    render() {
        const {username, password, email} = this.state;
        return (
        <>
        <form onSubmit={this.handleFormSubmit}>
          <p><label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} /></p>
          <p><label>Email:</label>
          <input type="email" name="email" value={email} onChange={this.handleChange}/></p>
          <p><label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange}/></p>
          <button>Signup</button>
        </form>
        <p>
          Already have account?
          <NavLink to={"/login"}> Login</NavLink>
        </p>
      </>

        )
    }
}

export default Signup;