import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import {AuthContext} from '../ontext.js/AuthContext'
function AdminDashboard() {
  const [users,setUsers]=useState([])
  const [fl,setFl]=useState(0)
  const context=useContext(AuthContext)
  const token=context.token
  // console.log(token)
  const getCallback=useCallback(()=>{
    const getUsers=async()=>{
      await axios.get("/api/user/all",{
        headers:{
          Authorization:token
        }
      })
      .then((res)=>setUsers(res.data.users))
      // .then((res)=>setFl(res.data.length))
      .catch((err)=>toast.error(err.response.data.msg))
    };
    getUsers();
  },[]);
  useEffect(()=>{
    getCallback();
  },[])
  const deleteUser=async(id)=>{
    if (window.confirm("Are you sure to delete a file")){
      await axios.delete(`/api/user/delete/${id}`,{
        // headers:{
        //   Authorization:token
        // }
      }).then(res=>{
        toast.success(res.data.msg)
        // window.location.reload()
      }).catch(err=>toast.error(err.response.data.msg))
    }
  }
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center mt-2">
          <h3>Admin dashboard</h3>
        </div>
      </div>
      <div className="row ">
       {
        users &&
        users.map((item,index)=>{
        
          return(
           <div className="row" key={index}>
              {/* <h1>Number of users Registered are {index+1}</h1> */}
             {/* <div className="col">user1</div> */}
            <div className="col">
              <h3 className='mb-2'>{index+1}.{item.name} &nbsp; 
               emailID:{item.email}</h3>
               <button onClick={()=>deleteUser(item._id)}>delete</button>
            </div>
            {/* <div className="col">user3</div> */}
           </div>
          )
        })
       }
      </div>
    </div>
  )
}

export default AdminDashboard