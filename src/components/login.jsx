import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import {actionCreators} from '../state/index';
import { bindActionCreators } from "redux";
import { useSelector } from 'react-redux';


const Container = styled(FormGroup)`
width: 50%;
margin: 5% 0 0 25%;
& > div {
    margin-top: 20px;
`;

const initialValue = {
    userName: '',
    password: ''
}

function Login(){
    const dispatch=useDispatch();
    const {userAuthData} = bindActionCreators(actionCreators,dispatch);
    const [userData , setUserData] = useState({});
    const navigate = useNavigate();
    const [user, setUser] = useState(initialValue);
    const AuthData=useSelector(state=>state)
    
    

    const { userName , password } = user;

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    useEffect(() =>{
        userAuthData(" ");
        console.log("AuthDAta=================>",AuthData)
        axios.get(`http://localhost:8080/api/v1/user/allUser/`)
        .then(res =>{
            // sessionStorage.removeItem('usesID');
            console.log("response",res.data);
            setUserData(res.data);
        }).catch(err => console.log("err",err))
    },{})

    const onSubmit=()=>{
        
        console.log("inside Function")
        // return(navigate('/Dashboard'));
        for(var i=0; i<userData.length;i++){
            console.log("======>",userData[i].email);
            console.log("USer",user,password)
            if(userData[i].email === user.userName && userData[i].Password === user.password){
                sessionStorage.setItem('userID',userData[i].id);
                userAuthData(userData[i]);
                return(navigate('/Home'));
            }
        }
    }

    return(
        <>
         <Container>
            <Typography variant="h4">Login</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='userName' value={userName} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='password' value={password} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => {onSubmit()}}>Login</Button>
            </FormControl>
        </Container>
        </>
    );
}

export default Login;