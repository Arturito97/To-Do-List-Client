import React from 'react';
import { getAllTasks, deleteTask, addTask, updateTask, loggedin } from '../api';
import '../App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

// Reorder the list items
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class ListTasks extends React.Component {
    state = {
        title: '',
        loggedInUser: null,
        filteredTasks: [],
        searchKeyword: '',
        completedTasks: [],
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
          title,
          order: this.state.tasks.length
      }
      const response = await addTask(newTask)
      newTask._id = response.data._id

      this.setState({
        searchKeyword: '',
        tasks: this.state.tasks.concat(newTask),
      }, () => {
        this.setState({
          filteredTasks: this.state.tasks
        })
      })
    }

    async componentDidMount(){
      if(this.state.loggedInUser === null) {
        const response = await loggedin();
        if(response.data._id){
          this.setCurrentUser(response.data);
        }
      }  
    }
    

    async componentDidMount() {
      
        
        
      const response = await getAllTasks();
      this.setState({
          tasks: response.data,
          filteredTasks: response.data
      });
      }
    
      setCurrentUser = (user) => {
        
        this.setState({
          loggedInUser: user
        });
      }


    handleDeleteTask = async (id) => {
      await deleteTask(id);
      this.setState({
        tasks: this.state.tasks.filter((task) => task._id !== id),
        filteredTasks: this.state.filteredTasks.filter((task) => task._id !== id),
      })
      toast.success('Task completed!', {
        hideProgressBar: true
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

    

    handleOnDragEnd = async (result) => {
      console.log(result);
      if(!result.destination) {
        return;
      }

      const items = reorder(
        this.state.filteredTasks,
        result.source.index,
        result.destination.index
      );

      this.setState({
        filteredTasks: items
       }, async () => {
         let updateTasksPromises = [];
         this.state.filteredTasks.forEach((task, index) => {
           task.order = index
            updateTasksPromises.push(updateTask(task))
         })
         const result = await Promise.all(updateTasksPromises);
         console.log(result);

         const response = await getAllTasks();
         this.setState({
             tasks: response.data,
             filteredTasks: response.data
         });
         })


    }


    render() {
        const { title, _id } = this.state;

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
            
            <div className="row">
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
              
              <div className="toDo">
              <h3>To Do:</h3>
              <br />
              <Droppable droppableId="toDoTasks" > 
                {(provided) => (
                <ul className="toDoTasks" {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.filteredTasks.map((task, index) => {
                    
                    return <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) =>(
                        
                      <li className='list' key={index} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {index + 1}. &nbsp;&nbsp;&nbsp; {task.title}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="button" onClick={() => this.handleDeleteTask(task._id)}>Done</button>
                        
                    </li>
                    
                    )}
                    
                    </Draggable>
                  })}
                {provided.placeholder}
                </ul>
              )}
              
              </Droppable>
              </div>              
            </DragDropContext>
            
            </div>
          </div>
        )
    }
}

export default ListTasks