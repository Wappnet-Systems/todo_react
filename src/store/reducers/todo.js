import { ADD_TODO, UPDATE_TODO, DELETE_TODO, COMPLETED_TODO, INCOMPLETED_TODO } from "../actionTypes/actionTypes";

const initialState = {
    todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO:
        return {
            ...state,
            todos: [ action.payload, ...state.todos,]
        }
    case UPDATE_TODO:
        return { ...state, 
            todos: state.todos.map(todo => {
            if(todo.id === action.payload.id) {
                return {
                    ...todo,
                    text: action.payload.text,
                }
            }
            return todo;
        })
    }
    case DELETE_TODO: 
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload)
          };
    case COMPLETED_TODO:
        return {
            ...state, 
            todos: state.todos.map(todo => {
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: true,
                    }
                }
                return todo;
            })
        }
    case INCOMPLETED_TODO:
        return {
            ...state, 
            todos: state.todos.map(todo => {
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        inComplete: true,
                    }
                }
                return todo;
            })
        }

    default:
        return state;
  }
}

export default todoReducer

