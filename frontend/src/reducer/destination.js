 const destinationAPI = (destinaiton = [],action)=>{
    switch(action.type){
        case "GET_DESTINATION":
            return action.payload
        default:
             return destinaiton;
    }
}

export default destinationAPI