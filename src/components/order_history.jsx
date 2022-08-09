import { useState, useEffect } from 'react';
import axios from "axios";
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CsvDownload from 'react-json-to-csv';
import { useSelector } from 'react-redux/es/hooks/useSelector';

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

const OrderHistory = () => {
    const [users, setUsers] = useState([]);
    const [counter, setCounter] =useState(0);
    const [userlist, setUserlist] = useState([]);
    const [product, setProductList] = useState([]);
    const [isDataPresent, setIsDataPresent] = useState(false);
    const [id,setId] = useState();
    const navigate = useNavigate();
    const AuthData=useSelector(state=>state.user);

    useEffect(()=>{
        console.log("AuthDAta=================>",AuthData)
        // if(AuthData.length === 0){
        //    return navigate('/');
        // }
        userId();
        getAllProducts();
    },[])

    useEffect(() => {
        getAllProducts();
    }, [isDataPresent,id]);

    // useEffect (() =>{
    //     getNextPage();
    //     getPreviousPage();
    // },[counter])


    const userId =() =>{
        console.log("ID",sessionStorage.getItem('userID'));
        setId(sessionStorage.getItem('userID'))
    }
    const getAllProducts = async () => {
    
        await axios.get(`http://localhost:8080/api/v1/user/order/${id}`)
        .then(res =>{
            console.log("response",res.data.Order);
            setUsers(res.data);
            if(res.data.Order.length === 0){
                setIsDataPresent(false);
            } else{
                setIsDataPresent(true);
                setProductList(res.data.Order)
            }
            
        }).catch(err => console.log("err",err))
    }

    // const getAllUsersDownload = async () => {
    //     await axios.get(`http://localhost:8080/api/v1/user/allUser`)
    //     .then(res =>{
    //         console.log("response",res.data);
    //         let new_list = res.data.map(function(obj) {
    //             return {
    //               name: obj.name,
    //               email: obj.email,
    //               phone: obj.phone_no
    //             }
    //           });
    //           setUserlist(new_list);
    //     }).catch(err => console.log("err",err))
    // }

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
        // setCounter(counter+1);
        await axios.get(`http://localhost:8080/api/v1/user/limitedUser/5/${counter}`)
        .then(res =>{
            console.log("response",res.data);
            setUsers(res.data);
        }).catch(err => console.log("err",err))
    }

    const getPreviousPage = async () => {
        // if(counter !== 0){
        //     setCounter(counter-1);
        // }
        await axios.get(`http://localhost:8080/api/v1/user/limitedUser/5/${counter}`)
        .then(res =>{
            console.log("response",res.data);
            setUsers(res.data);
        }).catch(err => console.log("err",err))
    }

    return (
        <><Navbar />
        {/* <div style={{float:'left', paddingLeft:'50px'}}>
        <Button color="primary" variant="contained" style={{paddingRight: 50, display:"flex" , justifyContent:"flex-center" }} component={Link} to={`/addUser`}>Add USer</Button>
        </div>  */}
         {isDataPresent?
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Index</TableCell>
                    <TableCell>OrderBy</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Product Name</TableCell>
                </THead>
            </TableHead>
            <TableBody>
            {product.map((product,index) => (
                    <TRow key={product.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{users.name}</TableCell>
                        <TableCell>{users.email}</TableCell>
                        <TableCell>{users.phone_no}</TableCell>
                        <TableCell>{product.OrderName}</TableCell>
                    </TRow>
                    ))}
            </TableBody>
        </StyledTable>:
         <div style={{color:"red",  float:'center'}}>"NO Record Found"</div>
            }
        {/* <CsvDownload style={{color:'white',backgroundColor:"#1976d2", border:"none",borderRadius:'5px', height:"37px"}} data={userlist} filename="User.csv">Download</CsvDownload> */}
        {/* <div style={{float:'left', paddingLeft:'50px'}}>
        <Button color="primary" variant="contained" style={{ marginRight: 10 }} onClick={() => {getPreviousPage();decrement()}}>Previous</Button>
        </div>
        <div style={{float:'Right', paddingRight:'100px'}}>
        <Button color="primary" variant="contained" style={{ align:"right" }} onClick={() => {getNextPage();increment()}}>next</Button>
        </div> */}
        </>
    )
}

export default OrderHistory;