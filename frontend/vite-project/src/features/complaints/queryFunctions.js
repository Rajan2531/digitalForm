import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function GetComplaint(id){
    const res = await axios({
        method:'get',
        url:`${API_BASE}/api/v1/complaints/${id}`,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true,
        
    })

    return res.data.data;
}