import { LOGIN, LOGOUT } from '../actionTypes/actionTypes'

export const login = (response) => {
    return {
        type: LOGIN,
        payload: response
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}