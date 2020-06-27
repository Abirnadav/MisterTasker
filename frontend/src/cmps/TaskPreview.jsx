import React, { Component } from "react";
import Moment from "moment";
import { updateTask } from "../store/actions/taskActions";
import pen from "../assets/images/pen.svg";
import priority from "../assets/images/movement.svg";
import started from "../assets/images/started.svg";
import statistics from "../assets/images/statistics.svg";
import finish from "../assets/images/finish.svg";

import { connect } from "react-redux";

class TaskPreview extends Component {
  state = {
    description: this.props.task.description,
    importance: this.props.task.importance,
    title: this.props.task.title,
    isEdit: false,
  };

  handleChange = (ev) => {
    let { name, value } = ev.target;
    value = ev.target.type === "number" ? parseInt(value) : value;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  onUpdateContent = (field) => {
    this.props.updateTask(this.props.task, this.state[field], field);
  };

  toggleEdit() {
    this.setState(({ isEdit }) => ({
      isEdit: !isEdit,
    }));
  }
  render() {
    const {
      _id,
      title,
      description,
      importance,
      createdAt,
      triesCount,
      doneAt,
    } = this.props.task;

    return (
      <div className="task-preview flex space-between">
        <div className="task-details flex column">
          <div className="task-details-item flex align-center">
            {this.state.isEdit ? (
              <>
                <h3>
                  <span>Task name: </span>
                </h3>
                <input
                  onBlur={() => this.onUpdateContent("title")}
                  type="text"
                  name="title"
                  onInput={(ev) => this.handleChange(ev, "title")}
                  onChange={(ev) => this.handleChange(ev, "title")}
                  value={this.state.title}
                  placeholder="Empty"
                ></input>
              </>
            ) : (
              <h3>
                <span>Task name: </span>
                {title}
              </h3>
            )}
          </div>
          <div className="task-details-item flex align-center">
            <img
              style={{ cursor: "pointer" }}
              className="img-icon"
              src={pen}
              alt="pen"
              title="edit"
            />
            {this.state.isEdit ? (
              <input
                onBlur={() => this.onUpdateContent("description")}
                type="text"
                name="description"
                onInput={(ev) => this.handleChange(ev, "description")}
                onChange={(ev) => this.handleChange(ev, "description")}
                value={this.state.description}
                placeholder="Empty"
              ></input>
            ) : (
              <h3>{description ? description : "Write a description..."} </h3>
            )}
          </div>
          <div className="task-details-item flex align-center">
            <img
              className="img-icon"
              src={priority}
              alt="Importance"
              title="edit"
            />
            {this.state.isEdit ? (
              <>
                <h3>Importance:</h3>
                <select
                  onBlur={() => this.onUpdateContent("importance")}
                  name="importance"
                  value={this.state.importance}
                  onChange={this.handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </>
            ) : (
              <h3>Importance: {importance}</h3>
            )}
          </div>

          <div className="task-details-item flex align-center">
            <img
              className="img-icon"
              src={started}
              alt="Started"
              title="Created At"
            />
            <h3>
              Created At: {Moment(createdAt).format("DD/MM/YYYY, hh:mm:ss")}
            </h3>
          </div>
          <div className="task-details-item flex align-center">
            <img
              className="img-icon"
              src={statistics}
              alt="statistics"
              title="Attempts"
            />
            <h3>Attempts: {triesCount}</h3>
          </div>

          <div className="task-details-item flex align-center">
            <img
              className="img-icon"
              src={finish}
              alt="Completed"
              title="Finished At"
            />
            {doneAt && (
              <h3>
                Completed At: {Moment(doneAt).format("DD/MM/YYYY, hh:mm:ss")}
              </h3>
            )}
            {!doneAt && <h3>Completed At: N/A</h3>}
          </div>
        </div>
        <div className="task-actions flex column space-between">
          <div className="flex space-between">
            <button className="btn-edit" onClick={() => this.toggleEdit()}>
              {this.state.isEdit ? "Save" : "Edit"}
            </button>
            <button
              className="btn-delete"
              onClick={() => this.props.onTaskDelete(_id)}
            >
              Delete
            </button>
          </div>
          {!doneAt && (
            <button
              className="btn-start"
              onClick={() => this.props.onTaskStart(_id)}
            >
              Start
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.taskStore.tasks,
  };
};

const mapDispatchToProps = {
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPreview);
