import React, { useState } from 'react';
import { getAllTasks, deleteTask, addTask } from '../api';
import '../App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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
      event.preventDefault()
      const { title } = this.state;

      //2. create the project on our api
      const newTask = {
          title
      }
      await addTask(newTask);

      this.setState({
        searchKeyword: '',
        tasks: this.state.tasks.concat(newTask),
      }, () => {
        this.setState({
          filteredTasks: this.state.tasks
        })
      })
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
            filteredTasks: response.data
        });
    }

    handleDeleteTask = async (id) => {
      await deleteTask(id);
      this.setState({
        tasks: this.state.tasks.filter((task) => task._id !== id),
        filteredTasks: this.state.filteredTasks.filter((task) => task._id !== id)
      })
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
        const [tasks, updateTasks] = useState(id)
        function handleOnDragonEnd(result) {
         if(!result.destination) return;
          const items = Array.from(tasks);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);

          updateTasks(items);
        }

        return (
            
            <div>
            <h4 className="searchBar">Search for a task: <input onChange={this.handleSearch} value={this.state.searchKeyword} /></h4>
            <br />
            <form onSubmit={this.handleFormSubmit} encType='multipart/form-data'>
                <h5><label>Add a Task:</label>
                &nbsp;
                <input type="text" name="title" onChange={this.handleChange} value={title} />
                &nbsp;
                <button type='submit'>New task</button></h5>
            </form>
            <br />
            <DragDropContext onDragEnd={handleOnDragonEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
            <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.filteredTasks.map((task, index) => {
                    return <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) =>(
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {task.title}
                        &nbsp;
                        <button onClick={() => this.handleDeleteTask(task._id)}>Delete</button>
                        &nbsp;
                        
                    </li>
                    )}
                    </Draggable>
                })}
                {provided.placeholder}
            </ul>
              )}
            </Droppable>
            </DragDropContext>
            </div>
        )
    }
}

export default ListTasks