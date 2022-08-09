export const userAuthData = (data)=>{
    return (dispatch)=>{
        console.log("data======>",data)
        dispatch({
            type:"Auth-Data",
            payload:data
        })
    }
}

export const userLogoutData = ()=>{
    return (dispatch)=>{
        console.log("logoutdata======>")
        dispatch({
            type:"Logout-Data",
        })
    }
}

export const userHomePageData = (data)=>{
    return (dispatch)=>{
        console.log("Homedata======>",data)
        dispatch({
            type:"Home-Data",
            payload:data
        })
    }
}

export const productPageData = (data)=>{
    return (dispatch)=>{
        console.log("Productdata======>",data)
        dispatch({
            type:"Product-Data",
            payload:data
        })
    }
}