const  reducerHome = (state="",action) =>{
    if(action.type === "Home-Data"){
        return action.payload;
    }
    else {
        return state;
    }
}

export default reducerHome;