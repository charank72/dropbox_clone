import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
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
  })
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
            {file.extName === ".PNG" ||
                    file.extName === ".png" ||
                    file.extName === ".jpg" ||
                    file.extName === ".jpeg" ? (
                      <img
                        src={`${url}/${file.newName}`}
                        type=""
                        className="image-fluid card-img-top"
                      />
                    ) : null}
                    {file.extName === ".pdf" ? (
                      <embed
                      src={`${url}/${file.newName}`} style={{width:'100vw',height:'80vh'}}
                        type=""
                        className="image-fluid card-img-top"
                      />
                    ) : null}
                    {file.extName === ".ppt" || file.extName === ".doc"|| file.extName === ".docx"||
                    file.extName === ".xls"|| file.extName===".pptx" ? (
                     <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}/${file.newName}`} frameborder="0" className="image-fluid card-img-top" style={{width:'100vw',height:'80vh'}}></iframe>
                    ) : null}
                    {file.extName === ".doc" ? (
                      <img
                        src="https://play-lh.googleusercontent.com/emmbClh_hm0WpWZqJ0X59B8Pz1mKoB9HVLkYMktxhGE6_-30SdGoa-BmYW73RJ8MGZQ"
                        alt=""
                        className="image-fluid card-img-top"
                      />
                    ) : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View ;
