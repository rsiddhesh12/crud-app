import react, { useState ,useEffect} from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { addProduct } from '../utils/apiProduct';

const initialValue = {
    pname: '',
    price: '',
    description: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddProduct = () => {
    const [user, setUser] = useState(initialValue);
    const { pname, price, description} = user;
    let navigate = useNavigate();
    const AuthData=useSelector(state=>state.user);

    useEffect(()=>{
        console.log("AuthDAta=================>",AuthData)
    },[])

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        await addProduct(user);
        return navigate('/Product');
    }

    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Product Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='pname' value={pname} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='price' value={price} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </Container>
    )
}

export default AddProduct;