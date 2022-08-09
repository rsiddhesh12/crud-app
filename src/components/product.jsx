import { useState, useEffect } from 'react';
import axios from "axios";
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { Link ,useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import CsvDownload from 'react-json-to-csv';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import {actionCreators} from '../state/index';
import { bindActionCreators } from "redux";
import { deleteProduct, getProduct, nextProductPage, previousProductPage } from '../utils/apiProduct';
import { productPageData } from '../state/action-creator/userAction';


const StyledTable = styled(Table)`
    width: 90%;
    margin: 10px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;


const Product = () => {
    const [users, setUsers] = useState([]);
    const [counter, setCounter] = useState(0);
    const [userlist, setUserlist] = useState([]);
    const [id,setID] = useState();
    const [productName,setProductName] = useState();
    const AuthData=useSelector(state=>state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {productPageData} = bindActionCreators(actionCreators,dispatch)

    useEffect(() => {
        console.log("AuthDAta=================>",AuthData)
        // if(AuthData.length === 0){
        //    return navigate('/');
        // }
        getAllProducts();
        getAllProductsDownload();
    }, []);

    useEffect(()=>{
        getNextPage();
        getPreviousPage();
    },[counter])

    useEffect(()=>{
        buyProduct();
    },[id,productName])

    const deleteUserData = async (id) => {
        await deleteProduct(id);
        getAllProducts();
    }

    const getAllProducts = async () => {
        let Response = await getProduct();
        setUsers(Response.data);
        productPageData(Response.data);
    }

    const getAllProductsDownload = async () => {
        await axios.get(`http://localhost:8080/api/v1/user/product/allProduct`)
        .then(res =>{
            console.log("response",res.data);
            let new_list = res.data.map(function(obj) {
                return {
                  ProductName: obj.pname,
                  Price: obj.price,
                  Description: obj.description
                }
              });
              setUserlist(new_list);
        }).catch(err => console.log("err",err))
    }

    const decrement = () => {
        if(counter !==0){
                  // Counter state is decremented
        setCounter(counter - 1);
        }
      
      }

    const increment = () => {
        // Counter state is decremented
        setCounter(counter + 1);
      }
      
    const getNextPage = async () => {
        let Response = await nextProductPage(counter);
        setUsers(Response.data);
        productPageData(Response.data);
    }

    const getPreviousPage = async () => {
        console.log("counter==>",counter);
        // if(counter !== 0){
        //     decrement();
        // }
        console.log("counter--->",counter);
        await axios.get(`http://localhost:8080/api/v1/user//product/limitedProduct/5/${counter}`)
        .then(res =>{
            console.log("response",res.data);
            setUsers(res.data);
            productPageData(res.data);
        }).catch(err => console.log("err",err))
        // let Response = await previousProductPage(counter);
        // setUsers(Response.data);
        // productPageData(Response.data)
    }

    const getID = (data) => {
        setProductName(data);
        setID(sessionStorage.getItem('userID'));
      }
    
    const buyProduct= async () =>{
        console.log("id",id);
        const payload ={
            id:id,
            OrderName:productName,
        }
        if(productName !== undefined){
            await axios.post(`http://localhost:8080/api/v1/user/order/createOrder`,payload)
            .then(res =>{
                console.log("response",res.data);
            }).catch(err => console.log("err",err))
        }
    }

    return (
        <>
        <Navbar />
        <div style={{float:'left', paddingLeft:'50px'}}>
        <Button color="primary" variant="contained" style={{paddingRight: 50, display:"flex" , justifyContent:"flex-center" }} component={Link} to={`/addProduct`}>Add Product</Button>
        </div>
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Index</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Action</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.map((user,index) => (
                    <TRow key={user.pid}>
                        <TableCell>{(counter*5)+(index+1)}</TableCell>
                        <TableCell>{user.pname}</TableCell>
                        <TableCell>{user.price}</TableCell>
                        <TableCell>{user.description}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/editproduct/${user.pid}`}>Edit</Button>
                            <Button color="secondary" variant="contained" style={{marginRight:10}} onClick={() => deleteUserData(user.pid)}>Delete</Button> 
                            <Button color="success" variant="contained" onClick={() => {getID(user.pname)}}>Buy</Button> 
                        </TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
        <CsvDownload style={{color:'white',backgroundColor:"#1976d2", border:"none",borderRadius:'5px', height:"37px"}} data={userlist} filename="Product.csv">Download</CsvDownload>
        <div style={{float:'left', paddingLeft:'50px'}}>
            <Button color="primary" variant="contained" style={{ align:"right" }}  onClick={() => {getPreviousPage();decrement()}}>Previous</Button>
        </div>
        <div  style={{float:'right',paddingRight:'100px'}}> 
            <Button color="primary" variant="contained" style={{ align:"right" }}  onClick={() => {getNextPage();increment()}}>next</Button>
        </div>
        </>
    )
}

export default Product;