import Navbar from "./Navbar";
import {useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Home() {
    const AuthData=useSelector(state=>state.user)
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("AuthDAta=================>",AuthData)
        // if(AuthData.length === ":"){
        //    return navigate('/');
        // }
    },[])
    

    // let navigate = useNavigate();
    // useEffect(() => {
    //     if(localStorage.getItem('username').length !== 0){
    //         // getAllUsers();
    //         // getAllUsersDownload();
    //     } else{
    //         return navigate('/')
    //     }
    // }, []);

    return (  
        <>
            <Navbar />
            <div className="container-fluid">
            <img src="/images/welcome.jpg" width="1520" height="660" /> 
            </div>
        </>
    );
}

export default Home;