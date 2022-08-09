const  reducerProduct = (state="",action) =>{
    if(action.type === "Product-Data"){
        return action.payload;
    }
    else {
        return state;
    }
}

export default reducerProduct;