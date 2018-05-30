const initialState = {
    user: {}
}

const GET_USER = 'GET_USER';

export function getUser(param) {
    return {
        type: GET_USER,
        payload: param
    }
}

export default function reducer(state = initialState, action){
    const { payload, type } = action;
    switch(type) {
        case GET_USER :
        return Object.assign({}, state, {user: payload})
        default:
        return state
    }
}