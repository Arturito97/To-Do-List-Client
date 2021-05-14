import React from "react";
import { updateTask, getTask } from "../api";
import '../App.css';

class EditTask extends React.Component {
  state = {
    _id: "",
    title: "",
  };
  async componentDidMount() {
    const taskId = this.props.match.params.id;
    const response = await getTask(taskId);
    this.setState({
      _id: response.data._id,
      title: response.data.title,
    });
  }
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleFormSubmit = async (event) => {
    event.preventDefault();
    await updateTask(this.state);
    this.props.history.push(`/tasks`);
  };
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <button type="submit">Update</button>
      </form>
    );
  }
}
export default EditTask;