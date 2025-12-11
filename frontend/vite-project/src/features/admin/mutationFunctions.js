import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE;
console.log(API_BASE_URL)
export async function Login({email, password}){
    const res = await axios({
        method:'post',
        url:`${API_BASE_URL}/api/v1/admin/login`,
        headers:{
            'Content-Type':'application/json'
        },
        data:{
            email,
            password
        },
        withCredentials:true
    })
    
    return res.data;
}

export async function Logout(){
    const res = await axios({
        method:'get',
        url:`${API_BASE_URL}/api/v1/admin/logout`,
        headers:{
            'Content-Type':'application/json'
        },
        
        withCredentials:true
    })
    
    return res.data;
}