const initialState = {
        id: '',
        name: '',
        email: '',
        password: ''
}

const user = (user = initialState, action) => {
    switch (action.type) {
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            console.log(action?.data);
            return action?.data;
        case "GET_USER":
            return action.payload;
        case "GET_ALL_USER":
            return action.payload;

        case "LOGOUT":
            localStorage.clear();
            return user
        default:
            return user;
    }
}

export default user;