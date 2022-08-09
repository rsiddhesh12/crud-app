import axios from 'axios';



export const getProduct = async () => {
    try {
        return await axios.get(`http://localhost:8080/api/v1/user/product/limitedProduct/5/0`);
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}

export const addProduct = async (user) => {
    return await axios.post(`http://localhost:8080/api/v1/user/product/addProduct`,user);
}

export const deleteProduct = async (id) => {
    id = id || '';
    return await axios.delete(`http://localhost:8080/api/v1/user/product/${id}`);
}

export const nextProductPage = async (counter) => {
    counter = counter || '';
    return await axios.get(`http://localhost:8080/api/v1/user//product/limitedProduct/5/${counter}`);
}

export const previousProductPage = async (counter) => {
    counter = counter || '';
    return await axios.get(`http://localhost:8080/api/v1/user//product/limitedProduct/5/${counter}`);
}


export const getOneProduct = async (id) => {
    return await axios.get(`http://localhost:8080/api/v1/user/product/${id}`)
}


export const editProduct = async (id, user) => {
    return await axios.post(`http://localhost:8080/api/v1/user/product/${id}`,user)
}