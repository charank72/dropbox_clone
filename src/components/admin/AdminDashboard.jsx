import axios from 'axios'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import {AuthContext} from '../ontext.js/AuthContext'
function AdminDashboard() {
  const [users,setUsers]=[]
  const context=useContext(AuthContext)
  const token=context.token
  // console.log(token)
  const getCallback=useCallback(()=>{
    const getUsers=async()=>{
      await axios.get('/api/admin/all',{
        headers:{
          Authorization:token
        }
      })
      .then((res)=>setUsers(res.data.users))
      .catch((err)=>toast.error(err.response.data.msg))
    };
    getUsers();

  },[]);
  useEffect(()=>{
    getCallback();
  },[])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center mt-2">
          <h3>Admin dashboard</h3>
        </div>
      </div>
      <div className="row ">
        <div className="col">user1</div>
        <div className="col">{users}</div>
        <div className="col">user3</div>
      </div>
    </div>
  )
}

export default AdminDashboard