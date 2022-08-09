import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import Navbar from './Navbar';
import fileDownload from 'js-file-download';
import { getDownloadLogs, getLogs } from '../utils/logFile';



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

const Logfile = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        getAllUsers();
    }, []);


    const downloadLogData = async (LogName) => {
        let Response = await getDownloadLogs(LogName);
        fileDownload(Response.data,LogName+'.csv');
    }

    const getAllUsers = async () => {
        let Response = await getLogs();
        setUsers(Response.data);
    }

    return (
        <><Navbar />
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Index</TableCell>
                    <TableCell>Log Name</TableCell>
                    <TableCell>Action</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.map((user,index) => (
                    <TRow key={user.lid}>
                        <TableCell>{(index+1)}</TableCell>
                        <TableCell>{user.LogName}</TableCell>
                        <TableCell>
                            <Button color="secondary" variant="contained" onClick={() => downloadLogData(user.LogName)}>Download</Button>
                        </TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
        </>
    )
}

export default Logfile;