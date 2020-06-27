import React from "react";
import TaskPreview from "./TaskPreview";

export default function TaskList(props) {
  const { tasks } = props;
  function taskDoneAmount() {
    let amount = 0;
    tasks.forEach((task) => {
      if (task.doneAt > 0) amount++;
    });
    return amount;
  }

  return (
    <div className="task-list">
      <h1>{tasks.length > 0 ? "My Tasks" : "No Tasks Found"}</h1>
      <div className="statistics">
        <span>Total Tasks: {tasks.length}</span>
        <span>Finished Tasks: {taskDoneAmount()}</span>
      </div>
      {tasks.map((task) => (
        <TaskPreview
          key={task._id}
          task={task}
          onTaskStart={props.onTaskStart}
          onTaskDelete={props.onTaskDelete}
        />
      ))}
    </div>
  );
}
