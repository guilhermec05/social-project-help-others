import axios from 'axios'


export const api = axios.create({
    timeout:5000,
})