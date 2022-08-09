import { useState, useEffect } from 'react';
import axios from "axios";
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CsvDownload from 'react-json-to-csv';
import { useSelector,useDispatch } from 'react-redux';
import {actionCreators} from '../state/index';
import { bindActionCreators } from "redux";
import { deleteUser, getUsers, nextPage, previousPage } from '../utils/apiCall';

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

const User = () => {
    const [users, setUsers] = useState([]);
    const [counter, setCounter] =useState(0);
    const [userlist, setUserlist] = useState([]);
    const AuthData=useSelector(state=>state.home);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userHomePageData} = bindActionCreators(actionCreators,dispatch)

    useEffect(() => {
        // if(AuthData.length === 0){
        //    return navigate('/');
        // }
        getAllUsers();
        getAllUsersDownload();
    }, []);

    useEffect (() =>{
        getNextPage();
        getPreviousPage();
    },[counter])

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }

    const getAllUsersDownload = async () => {
        await axios.get(`http://localhost:8080/api/v1/user/allUser`)
        .then(res =>{
            console.log("response",res.data);
            let new_list = res.data.map(function(obj) {
                return {
                  name: obj.name,
                  email: obj.email,
                  phone: obj.phone_no
                }
              });
              setUserlist(new_list);
        }).catch(err => console.log("err",err))
    }

    const decrement = () => {
        if(counter !==0){
            console.log("counter decrement",counter)
                  // Counter state is decremented
        setCounter(counter - 1);
        }
      
      }

    const increment = () => {
        // Counter state is decremented
        setCounter(counter + 1);
      }

    const getNextPage = async () => {
        let response = await nextPage(counter);
        // console.log(response.data,"Response==================>")
        setUsers(response.data);
        userHomePageData(response.data);
    }

    const getPreviousPage = async () => {
        // if(counter !== 0){
        //     setCounter(counter-1);
        // }
        console.log("counter============>",counter)
        await axios.get(`http://localhost:8080/api/v1/user/limitedUser/5/${counter}`)
        .then(res =>{
            console.log("response",res.data);
            setUsers(res.data);
            userHomePageData(res.data);
        }).catch(err => console.log("err",err))
        // console.log("counter",counter)
        // let response = await previousPage(counter);
        // setUsers(response.data);
        // console.log(response.data,"Response==================>")
        // userHomePageData(response.data);
    }

    return (
        <><Navbar />
        <div style={{float:'left', paddingLeft:'50px'}}>
        <Button color="primary" variant="contained" style={{paddingRight: 50, display:"flex" , justifyContent:"flex-center" }} component={Link} to={`/addUser`}>Add USer</Button>
        </div> 
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Index</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.map((user,index) => (
                    <TRow key={user.id}>
                        <TableCell>{(counter*5)+(index+1)}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone_no}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${user.id}`}>Edit</Button>
                            <Button color="secondary" variant="contained" onClick={() => deleteUserData(user.id)}>Delete</Button>
                        </TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
        <CsvDownload style={{color:'white',backgroundColor:"#1976d2", border:"none",borderRadius:'5px', height:"37px"}} data={userlist} filename="User.csv">Download</CsvDownload>
        <div style={{float:'left', paddingLeft:'50px'}}>
        <Button color="primary" variant="contained" style={{ marginRight: 10 }} onClick={() => {getPreviousPage();decrement()}}>Previous</Button>
        </div>
        <div style={{float:'Right', paddingRight:'100px'}}>
        <Button color="primary" variant="contained" style={{ align:"right" }} onClick={() => {getNextPage();increment()}}>next</Button>
        </div>
        </>
    )
}

export default User;