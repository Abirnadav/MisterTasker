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
    description: "",
  };

  constructor(props) {
    super(props);
    this.descriptionInput = React.createRef();
  }

  handleChange = (ev, field) => {
    this.setState({ [field]: ev.target.innerText });
  };

  onUpdateContent = (field, refInput) => {
    this.props.updateTask(this.props.task, this.state[field], field);
    refInput.current.contentEditable = false;
  };

  toggleEdit = (refInput) => {
    refInput.current.contentEditable = true;
    refInput.current.focus();
  };

  render() {
    const {
      _id,
      title,
      description,
      importance,
      createdAt,
      lastTriedAt,
      triesCount,
      doneAt,
    } = this.props.task;

    return (
      <div className="task-preview flex space-between">
        <div className="task-details flex column">
          <div className="task-details-item flex align-center">
            <h3>{title}</h3>
          </div>
          <div className="task-details-item flex align-center">
            <img
              style={{ cursor: "pointer" }}
              className="img-icon"
              src={pen}
              alt="pen"
              title="edit"
              onClick={() => this.toggleEdit(this.descriptionInput)}
            />
            <h3
              contentEditable={false}
              ref={this.descriptionInput}
              onFocus={() => this.setState({ description })}
              onInput={(ev) => this.handleChange(ev, "description")}
              onBlur={() =>
                this.onUpdateContent("description", this.descriptionInput)
              }
            >
              {description ? description : "Write a description..."}{" "}
            </h3>
          </div>
          <div className="task-details-item flex align-center">
            <img
              className="img-icon"
              src={priority}
              alt="Importance"
              title="edit"
            />

            <h3>Importance: {importance}</h3>
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
          <button
            className="btn-delete"
            onClick={() => this.props.onTaskDelete(_id)}
          >
            Delete
          </button>
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
