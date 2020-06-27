const initialState = {
    tasks: [],
}


export default function TaskReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                tasks: [...action.tasks]
            };
        case 'SET_TASK':
            return {
                ...state,
                currEvent: { ...action.task }
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.taskId)
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task._id === action.task._id) return action.task;
                    return task;
                }),
                currEvent: { ...action.task }
            }
        default:
            return state;
    }
}
