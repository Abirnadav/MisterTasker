import React from "react";
import TaskPreview from "./TaskPreview";

export default class TaskList extends React.Component {
  state = {
    sortBy: "createdAt",
  };

  getSortedTasks = () => {
    console.log("Sorting tasks");
    const tasks = this.props.tasks;
    const { sortBy } = this.state;
    return sortByKey(tasks, sortBy);
    function sortByKey(tasks, sortBy) {
      return tasks.sort(function (a, b) {
        var x = a[sortBy];
        var y = b[sortBy];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  };
  handleChange = (ev) => {
    let { name, value } = ev.target;
    console.log("TaskList -> handleChange -> value", value);
    value = ev.target.type === "number" ? parseInt(value) : value;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };
  taskDoneAmount() {
    const { tasks } = this.props;
    let amount = 0;
    tasks.forEach((task) => {
      if (task.doneAt > 0) amount++;
    });
    return amount;
  }
  render() {
    const tasks = this.getSortedTasks().reverse();

    return (
      <div className="task-list">
        <div className="sort-container">
          <select
            name="sortBy"
            value={this.state.sortBy}
            onChange={this.handleChange}
          >
            <option value="createdAt">Date created</option>
            <option value="doneAt">Date Finished</option>
          </select>
        </div>

        <h1>{tasks.length > 0 ? "My Tasks" : "No Tasks Found"}</h1>
        <div className="statistics">
          <span>Total Tasks: {tasks.length}</span>
          <span>Finished Tasks: {this.taskDoneAmount()}</span>
        </div>
        {tasks.map((task) => (
          <TaskPreview
            key={task._id}
            task={task}
            onTaskStart={this.props.onTaskStart}
            onTaskDelete={this.props.onTaskDelete}
          />
        ))}
      </div>
    );
  }
}
