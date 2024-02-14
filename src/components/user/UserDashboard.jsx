import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../ontext.js/AuthContext";
function UserDashboard() {
  const [docs, setDocs] = useState([]);
  const context = useContext(AuthContext);
  const token = context.token;
  const navigate=useNavigate()
  const url = "https://rest-api-7x1e.onrender.com";
  //callback
  const getCallback = useCallback(() => {
    const getInput = async () => {
      await axios
        .get("/api/file/all", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => setDocs(res.data.files))
        .catch((err) => toast.error(err.response.data.msg));
    };
    getInput();
  }, []);

  useEffect(() => {
    getCallback();
  }, []);

  const deleteFile=async(id)=>{
    if (window.confirm("Are you sure to delete a file")){
      await axios.delete(`/api/file/delete/${id}`,{
        headers:{
          Authorization:token
        }
      }).then(res=>{
        toast.success(res.data.msg)
        // window.location.reload()
        navigate('/')
        
      }).catch(err=>toast.error(err.response.data.msg))
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center  mt-5">
          <h3 className="display-3 text-secondary">User Dashboard</h3>
          <NavLink to={"/upload/new"} className="btn btn-danger float-end">
            <i className="bi bi-cloud"></i>Upload New
          </NavLink>
        </div>
      </div>
      <div className="row">
        {docs &&
          docs.map((item, index) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                  <div className="card file mt-3 mb-3">
                  <button  className="btn btn-sm btn-danger position-absolute w-25 end-0 top-0" onClick={() => deleteFile(item._id)} >
                        <i className="bi bi-trash3"></i>
                        </button>

                <NavLink to={`/view/file/${item._id}`}>
                    {item.extName === ".PNG" ||
                    item.extName === ".png" ||
                    item.extName === ".jpg" ||
                    item.extName === ".jpeg" ? (
                      <img
                        src={item.newName}
                        type=""
                        className="image-fluid card-img-top"
                      />
                    ) : null}
                    {item.extName === ".pdf" ? (
                      <img
                        src={`https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g`}
                        type=""
                        className="image-fluid card-img-top"
                      />
                    ) : null}
                    {item.extName === ".ppt" || item.extName === ".pptx" ? (
                      <embed
                        src={`https://assets-global.website-files.com/59deb588800ae30001ec19c9/62684ee8485b1960516abd39_1200px-Microsoft_Office_PowerPoint_(2018%E2%80%93present).svg.webp`}
                        type=""
                        className="image-fluid card-img-top"
                      />
                    ) : null}
                    {item.extName === ".doc" ? (
                      <img
                        src="https://play-lh.googleusercontent.com/emmbClh_hm0WpWZqJ0X59B8Pz1mKoB9HVLkYMktxhGE6_-30SdGoa-BmYW73RJ8MGZQ"
                        alt=""
                        className="image-fluid card-img-top"
                      />
                    ) : null}
                </NavLink>
                    <div className="card-body">
                      <h5 className="text-center text-success">
                        {item.info ? item.info.name : null}
                      </h5>
                    </div>
                  </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserDashboard;
