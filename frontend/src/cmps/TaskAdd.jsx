import React, { Component } from "react";
import { saveTask } from "../store/actions/taskActions.js";
import { connect } from "react-redux";

class TaskAdd extends Component {
  state = {
    title: "",
    importance: 2,
  };

  handleChange = (ev) => {
    let { name, value } = ev.target;
    value = ev.target.type === "number" ? parseInt(value) : value;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const newTask = {};
    newTask.title = this.state.title;
    newTask.createdAt = Date.now();
    newTask.triesCount = 0;
    newTask.importance = this.state.importance;
    newTask.lastTriedAt = null;
    newTask.doneAt = null;
    this.props.saveTask(newTask);
    this.setState({ title: "", importance: 2 });
  };

  render() {
    return (
      <div className="task-add">
        <form>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Enter a Task"
          ></input>
          <select
            name="importance"
            value={this.state.importance}
            onChange={this.handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.handleSubmit}>Add Task</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  saveTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskAdd);
