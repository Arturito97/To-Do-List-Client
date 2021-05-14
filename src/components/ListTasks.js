import React from 'react';
import { getAllTasks, deleteTask } from '../api';
import { NavLink } from 'react-router-dom';
import '../App.css';

class ListTasks extends React.Component {
    state = {
        tasks: [],
        loggedInUser: null
    }

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

    async componentDidMount() {
        const response = await getAllTasks();
        this.setState({
            tasks: response.data,
        });
    }

    handleDeleteTask = async (id) => {
      await deleteTask(id);
      this.props.history.push('/tasks');
  }

    render() {
        return (
            <ul>
                {this.state.tasks.map((task) => {
                    return <li key={task._id}>
                        <NavLink exact to={`/tasks/${task._id}`}>{task.title}</NavLink>
                        &nbsp;
                        <NavLink exact to={`/tasks/${task._id}/edit`}>Edit</NavLink>
                        &nbsp;
                    </li>
                })}
            </ul>
        )
    }
}

export default ListTasks