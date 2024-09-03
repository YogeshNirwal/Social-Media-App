import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { MdInsertComment } from "react-icons/md";
import toast from "react-hot-toast";

function AllUsers() {
  const [auth] = useAuth();
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  //get post
  const getAllPost = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/api/v1/post/get-post`
      );
      setAllPosts(data?.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllPost();
  }, [auth?.token, allPosts]);

  //delete a post
  const handleDelete = async (id) => {
    try {
      let answer = window.confirm("Are You Sure want to delete this post ? ");
      if (!answer) return;
      await axios.delete(
        `${window.location.origin}/api/v1/post/delete-post/${id}`
      );
      toast.success("post DEleted Succfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      {allPosts?.map((p) => (
        <div
          key={p._id}
          className="card m-auto mt-3"
          style={{ width: "25rem" }}
        >
          {p?.name === auth?.user.name && (
            <>
              <h4>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  onClick={() => {
                    handleDelete(p._id);
                  }}
                >
                  <MdDelete />
                </span>
              </h4>
            </>
          )}

          <div class="card-header fw-bold">{p.name}</div>
          <img
            src={`${window.location.origin}/api/v1/post/post-photo/${p._id}`}
            className="card-img-top"
            style={{ height: "30rem" }}
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">{p.description}</p>
          </div>
          <div class="card-footer d-flex justify-content-around text-body-secondary">
            <div style={{ width: "30%" }}>
              <BiSolidLike />
            </div>
            <div
              style={{ width: "30%" }}
              onClick={() => navigate(`/commentPost/${p._id}`)}
            >
              <MdInsertComment />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AllUsers;
