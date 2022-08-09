const  reducer = (state="",action) =>{
        if(action.type === "Auth-Data"){
            return action.payload;
        }
        // else if(action.type === "Home-Data"){
        //     return action.payload;
        // }
        else if(action.type === "Logout-Data"){
            return state;
        }
        else {
            return state;
        }
}

export default reducer;