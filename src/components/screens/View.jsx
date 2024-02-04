import axios from "axios";
import React, { useCallback,useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../ontext.js/AuthContext";



function View() {
  const url="https://rest-api-7x1e.onrender.com"
  const[file,setFile]=useState(false)
  const {token}=useContext(AuthContext)
  const params=useParams()

  const readFile=useCallback(()=>{
    const readData=async ()=>{
      await axios.get(`/api/file/single/${params.id}`,{
        headers:{
          Authorization:token
        }
      }).then(res=>{
        setFile(res.data.file)
      })
      .catch(err=>toast.error(err.response.data.msg))
    }
    readData()
  },[])
  useEffect(() => {
    readFile()
  },[])
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
        view doc
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 h-100">
          <div className="card">
            <div className="card-body">
            {
              file.extName === ".png" || file.extName === ".jpg" ? <img src={`${url}/${file.newName}`} className='img-fluid' /> : null
            }
            {
             file.extName === ".pdf" ? <embed src={`${url}/${file.newName}`} className='img-fluid' style={{ width: '100vw',height: '80vh'}} /> : null
            }

            {
            file.extName === ".pptx" || file.extName === ".ppt" || file.extName === ".docx" || file.extName === ".doc" || file.extName === ".xls" || file.extName === ".xlsx" ? <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}/${file.newName}`} className='img-fluid' style={{ width: '100vw',height: '80vh'}}></iframe> : null
             }       

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View ;
