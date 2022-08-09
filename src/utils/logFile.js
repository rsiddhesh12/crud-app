import axios from 'axios';



export const getLogs = async () => {
    try {
        return await axios.get(`http://localhost:8080/api/v1/user/logdata/getLog`);
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}


export const getDownloadLogs = async (LogName) => {
    try {
        return await axios.get(`http://localhost:8080/api/v1/user/logdata/getLogFileDownload/${LogName}`);
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}