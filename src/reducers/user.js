
const SET_USER = 'SET_USER'

const setUser = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}


const INITIAL_STATE = {
    name: 'zhanghao'
}
export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state
    }
}