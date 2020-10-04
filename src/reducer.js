
//how the app looks at start, we want user not logged in
export const initialState={
    //keep this in string format if you dont want to login everytime..only for demo purpose
    user: null,
}

//this is where we can push info to data layer, ex: we sigin, we want this info to push inot data layer
export const actionTypes={
    SET_USER: "SET_USER",
};



const reducer=(state, action)=>{
    console.log(action);
    switch(action.type){

//if you dispatch SET_USER action
        case actionTypes.SET_USER:
            return{
                //keep the state
                ...state,
                //but change the user to whatever we dispatched
                user: action.user,
            };
            default: 
            return state;
    }
};

export default reducer;