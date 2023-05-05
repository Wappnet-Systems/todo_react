import { ADD_TODO, UPDATE_TODO, DELETE_TODO, COMPLETED_TODO, INCOMPLETED_TODO } from "../actionTypes/actionTypes";

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        payload: { id: Date.now(), text, completed: false, inComplete: false }
    }
}

export const updateTodo = (id, text) => {
    return {
        type: UPDATE_TODO,
        payload: { id, text }
    }
}

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export const completedTodo = (id) => {
    return {
        type: COMPLETED_TODO,
        payload: id
    }
}

export const inCompletedTodo = (id) => {
    return {
        type: INCOMPLETED_TODO,
        payload: id
    }
}