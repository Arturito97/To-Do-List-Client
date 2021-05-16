import React from 'react';
import { getTask, deleteTask } from '../api';
import ListTasks from './ListTasks';
import '../App.css';

class TaskDetails extends React.Component {
    state = {
        _id: '',
        title: '',
    };

    async componentDidMount () {
        const taskId = this.props.match.params.id;
        const response = await getTask(taskId);
        this.setState({
            _id: response.data._id,
            title: response.data.title,
        })
    }

    handleDeleteTask = async (id) => {
        await deleteTask(id);
        this.props.history.push('/tasks');
    }

    render() {
        const {title, _id } = this.state;
        return(
            <>
                <h2> {title} </h2>
                <button onClick={() => this.handleDeleteTask(_id)}>Delete</button>
                <br />
                <br />
                <ListTasks />
            </>
        )
    }
}

export default TaskDetails;