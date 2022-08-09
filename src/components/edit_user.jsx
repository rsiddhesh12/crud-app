import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { editUser, getOneUser } from '../utils/apiCall';


const initialValue = {
    name: '',
    email: '',
    phone_no: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;


const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, email, phone_no } = user;
    const { id } = useParams();
    const navigate = useNavigate();
    const AuthData=useSelector(state=>state.user);

    useEffect(()=>{
        console.log("AuthDAta=================>",AuthData)
        // if(AuthData.length === 0){
        //    return navigate('/');
        // }
        loadUserDetails();
    },[])


    const loadUserDetails = async() => {
        // await axios.get(`http://localhost:8080/api/v1/user/${id}`)
        // .then(res =>{
        //     console.log("response",res.data);
        //     setUser(res.data);
        // }).catch(err => console.log("err",err))
        let response = await getOneUser(id);
        setUser(response.data);
    }

    const editUserDetails = async() => {
        // await axios.post(`http://localhost:8080/api/v1/user/${id}`,user)
        // .then(res =>{
        //     console.log("response",res.data);
        //     return(navigate('/User'));
        // }).catch(err => console.log("err",err))
        let response = await editUser(id,user);
        return navigate('/User')
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <Container>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone_no} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </Container>
    )
}

export default EditUser;