import axios from 'axios';

// const usersUrl = 'http://localhost:3002/users';


export const getUsers = async () => {
    try {
        return await axios.get(`http://localhost:8080/api/v1/user/limitedUser/5/0`);
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}

export const addUser = async (user) => {
    return await axios.post(`http://localhost:8080/api/v1/user/addUser`,user);
}

export const deleteUser = async (id) => {
    id = id || '';
    return await axios.delete(`http://localhost:8080/api/v1/user/${id}`);
}

export const nextPage = async (counter) => {
    counter = counter || '';
    return await axios.get(`http://localhost:8080/api/v1/user/limitedUser/5/${counter}`);
}

export const previousPage = async (counter) => {
    counter = counter || '';
    return await axios.get(`http://localhost:8080/api/v1/user/limitedUser/5/${counter}`);
}


export const getOneUser = async (id) => {
    return await axios.get(`http://localhost:8080/api/v1/user/${id}`)
}


export const editUser = async (id, user) => {
    return await axios.post(`http://localhost:8080/api/v1/user/${id}`, user)
}