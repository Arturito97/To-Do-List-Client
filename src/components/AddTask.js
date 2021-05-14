import React from 'react';
import { addTask } from '../api';
import ListTasks from './ListTasks';
import '../App.css';

class AddTask extends React.Component {
    state = {
        title: ''
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
          [name]: value,
        });
      };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const { title } = this.state;

        //2. create the project on our api
        const newTask = {
            title
        }
        await addTask(newTask);
        this.props.history.push('/tasks');
    }

    render() {
        const { title } = this.state;
        return (
            <>
            <form onSubmit={this.handleFormSubmit} encType='multipart/form-data'>
                <label>Title</label>
                <input type="text" name="title" onChange={this.handleChange} value={title} />

                <button type='submit'>Create</button>
            </form>

            <ListTasks />
            </>
        )
    }
}

export default AddTask;