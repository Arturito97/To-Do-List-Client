import './App.css';
import ListTasks from './components/ListTasks';
import { Switch, Route } from 'react-router-dom';
import TaskDetails from './components/TaskDetails'
import AddTask from './components/AddTask';
import Navbar from './components/Navbar';
import EditTask from './components/EditTask';
import Signup from './components/Signup';
import Login from './components/Login';
import React from 'react';
import { loggedin } from "./api";
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


class App extends React.Component {
  state = {
    loggedInUser: null,

  };

  async componentDidMount() {
    if(this.state.loggedInUser === null) {
      const response = await loggedin();
      if(response.data._id){
        this.setCurrentUser(response.data);
      }
    }
  }

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user
    });
  }

  render() {
    const { loggedInUser } = this.state;
  return (
    <div className="App">
      <ToastContainer autoClose={1250}/>
      <Navbar loggedInUser={loggedInUser} setCurrentUser={this.setCurrentUser}/>
      <Switch>
        <PrivateRoute exact path="/tasks" component={ListTasks} />
        <Route exact path='/tasks/add' component={AddTask} />
        <Route exact path='/tasks/:id' component={TaskDetails} />
        <Route exact 
        path='/signup'
         render={(props)=>{
            return <Signup {...props} setCurrentUser={this.setCurrentUser} />
          }} />
        <Route exact 
        path='/login'
         render={(props)=>{
            return <Login {...props} setCurrentUser={this.setCurrentUser} />
          }} />
        <Route exact path='/login-google' render={
          () => {
            window.location.href= `${process.env.REACT_APP_TASKS_API}/api/auth/google`
          }
        } />
      </Switch>
    </div>
    );
  }
}

export default App;
