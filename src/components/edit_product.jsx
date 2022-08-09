import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { editProduct, getOneProduct } from '../utils/apiProduct';

const initialValue = {
    pname: '',
    price: '',
    description: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;


const EditProduct = () => {
    const [user, setUser] = useState(initialValue);
    const { pname, price, description } = user;
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
        // await axios.get(`http://localhost:8080/api/v1/user/product/${id}`)
        // .then(res =>{
        //     console.log("response",id);
        //     setUser(res.data);
        // }).catch(err => console.log("err",err))
        let Response = await getOneProduct(id);
        setUser(Response.data);
    }

    const editUserDetails = async() => {
        // await axios.post(`http://localhost:8080/api/v1/user/product/${id}`,user)
        // .then(res =>{
        //     console.log("response",res.data);
        //     return(navigate('/Product'));
        // }).catch(err => console.log("err",err))
        await editProduct(id,user);
        return(navigate('/Product'));
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <Container>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Product Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='pname' value={pname} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='price' value={price} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </Container>
    )
}

export default EditProduct;