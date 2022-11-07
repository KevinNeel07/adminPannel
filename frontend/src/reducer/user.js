const initialState = {
        id: '',
        name: '',
        email: '',
        password: ''
}

const user = (user = initialState, action) => {
    switch (action.type) {
        case "SIGNUP_USER":
            return action.payload
        case "LOGIN_USER":
            return user = action.payload.user;
        case "GET_USER":
            return action.payload;
        case "GET_ALL_USER":
            return action.payload
        default:
            return user;
    }
}

export default user;