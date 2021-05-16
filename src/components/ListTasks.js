import React from 'react';
import { getAllTasks, deleteTask, addTask, getTask } from '../api';
import { NavLink } from 'react-router-dom';
import '../App.css';

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

class ListTasks extends React.Component {
    state = {
        title: '',
        tasks: [],
        loggedInUser: null,
        filteredTasks: [],
        searchKeyword: ''
    }

    handleChange = (event) => {
      let { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };

    handleFormSubmit = async (event) => {
      const { title } = this.state;

      //2. create the project on our api
      const newTask = {
          title
      }
      await addTask(newTask);
      this.props.history.push('/tasks');
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

    handleSearch = (event) => {
    this.setState({
      searchKeyword: event.target.value,
      filteredTasks: this.state.tasks.filter((task) => {
        return task.title
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase());
      }),
    });
  };

    render() {
        const { title, _id } = this.state;
        return (
            <div ondrop="drop(event)" ondragover="allowDrop(event)">
            <h4 className="searchBar">Search for a task: <input onChange={this.handleSearch} /></h4>
            <br />
            <form onSubmit={this.handleFormSubmit} encType='multipart/form-data'>
                <h5><label>Add a Task:</label>
                &nbsp;
                <input type="text" name="title" onChange={this.handleChange} value={title} />
                &nbsp;
                <button type='submit'>New task</button></h5>
            </form>
            <br />
            <ul>
                {this.state.tasks.map((task) => {
                    return <li key={task._id}>
                        <p draggable='true' ondragstart="drag(event)"><NavLink exact to={`/tasks/${task._id}`}>{task.title}</NavLink>
                        &nbsp;
                        <NavLink exact to={`/tasks/${task._id}/edit`}>Edit</NavLink>
                        <button onClick={() => this.handleDeleteTask(_id)}>Delete</button>
                        &nbsp;
                        </p>
                    </li>
                })}
            </ul>
            </div>
        )
    }
}

export default ListTasks