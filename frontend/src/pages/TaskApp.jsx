import React, { Component } from "react";
import TaskList from "../cmps/TaskList";
import { loadTasks, startTask, removeTask } from "../store/actions/taskActions";
import { connect } from "react-redux";
import TaskAdd from "../cmps/TaskAdd";
import socketService from "../services/socketService";

class TaskApp extends Component {
  async componentDidMount() {
    this.props.loadTasks();
    socketService.on("taskUpdate", this.socketTaskUpdate);
  }

  socketTaskUpdate = (task) => {
    console.log("socketTaskUpdate");
    this.props.loadTasks();
  };

  onTaskStart = (taskId) => {
    this.props.startTask(taskId);
  };

  onTaskDelete = (taskId) => {
    this.props.removeTask(taskId);
  };

  render() {
    const { tasks } = this.props;
    return (
      <>
        <TaskAdd />
        {tasks && (
          <TaskList
            tasks={tasks}
            onTaskStart={this.onTaskStart}
            onTaskDelete={this.onTaskDelete}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.taskStore.tasks,
  };
};

const mapDispatchToProps = {
  loadTasks,
  startTask,
  removeTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskApp);
