import taskService from '../../services/taskService.js';

export function loadTasks(filterBy) {
    return async dispatch => {
        try {
            const tasks = await taskService.query(filterBy)
            dispatch(setTasks(tasks));
            return tasks
        }
        catch (err) {
            console.log('taskService: err in loading tasks', err);
        }
    }
}

export function loadTask(id) {
    return async dispatch => {
        try {
            const task = await taskService.get(id)
            await dispatch(setTask(task));
            return task
        }
        catch (err) {
            console.log('taskService: err in loading task', err);
        }
    }
}

export function clearTask() {
    return async dispatch => {
        try {
            await dispatch(_clear());
        }
        catch (err) {
            console.log('taskService: err in clearing task', err);
        }
    }
}

export function saveTask(task) {
    return async dispatch => {
        try {
            const type = task._id ? 'UPDATE_TASK' : 'ADD_TASK';
            const savedTask = await taskService.save(task)
            await dispatch(_saveTask(type, savedTask));
            return savedTask
        }
        catch (err) {
            console.log('taskService: err in saving task', err);
        }
    }
}

export function updateTask(task, value, field) {
    return async dispatch => {
        try {
            const updatedTask = await taskService.update(task, value, field)
            dispatch(_saveTask('UPDATE_TASK', updatedTask));
        }
        catch (err) {
            console.log('taskService: err in updateTask action', err);
        }
    }
}



export function removeTask(taskId) {
    return async dispatch => {
        try {
            await taskService.remove(taskId)
            dispatch(_removeTask(taskId));
        }
        catch (err) {
            console.log('taskService: err in removeTask action', err);
        }
    }
}


export function startTask(taskId) {
    return async dispatch => {
        try {
            const updatedTask = await taskService.taskStart(taskId)
            dispatch(_saveTask('UPDATE_TASK', updatedTask));
        }
        catch (err) {
            console.log('taskService: err in updateTask action', err);
        }
    }
}



function setTasks(tasks) {
    return {
        type: 'SET_TASKS',
        tasks
    };
}

function setTask(task) {
    return {
        type: 'SET_TASK',
        task
    };
}

function _removeTask(taskId) {
    return {
        type: 'REMOVE_TASK',
        taskId
    };
}

function _clear() {
    return {
        type: 'CLEAR_TASK'
    };
}

function _saveTask(type, task) {
    return {
        type,
        task
    };
}
