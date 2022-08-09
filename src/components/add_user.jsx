import react, { useState,useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { addUser } from '../utils/apiCall';

const initialValue = {
    name: '',
    email: '',
    phone_no: '',
    Password:''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, email, phone_no , Password } = user;
    let navigate = useNavigate();
    const AuthData=useSelector(state=>state.user);

    useEffect(()=>{
        console.log("AuthDAta=================>",AuthData)
        // if(AuthData.length === 0){
        //    return navigate('/');
        // }
    },[])

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
    //    await axios.post(`http://localhost:8080/api/v1/user/addUser`,user)
    //     .then(res =>{
    //         // console.log("response",res.data);
    //         return navigate('/User')
    //     }).catch(err => console.log("err",err))
        let response = await addUser(user);
        return navigate('/User')
        // console.log(response.data,"Response==================>")
        // setUsers(response.data);
    }

    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone_no' value={phone_no} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='Password' value={Password} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </Container>
    )
}

export default AddUser;