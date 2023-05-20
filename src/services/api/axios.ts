import axios from 'axios'


export const api = axios.create({
    timeout:5000,
    baseURL:'http://localhost:3000'
})