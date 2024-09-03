import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const CreatePost = () => {
  const [auth] = useAuth();
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setName(auth?.user.name);
  }, [auth?.user.name]);
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      if (!description || !photo) {
        return toast.error("Photo or description are require");
      }

      const PostData = new FormData();
      PostData.append("name", name);
      PostData.append("description", description);
      PostData.append("photo", photo);
      const { data } = axios.post(
        `${window.location.origin}/api/v1/post/create-post`,
        PostData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Post Created Successfully");
        setDescription("");
        setPhoto("");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-9">
          <h1>Create Post</h1>
          <div className="m-1 w-75">
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="post"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleCreate}>
              CREATE POST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
