import React, { useState } from "react";
import OuterLayout from "../../components/layouts/OuterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${window.location.origin}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <OuterLayout title={"register-deepecom"}>
      <div className="register border border-primary bg-primary bg-opacity-10 rounded m-auto mt-5 mb-5">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              required
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter your favorite sport"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your new password"
            />
          </div>

          <center>
            <button type="submit" className="btn btn-primary width-5">
              Reset
            </button>
          </center>
        </form>
      </div>
    </OuterLayout>
  );
};

export default ForgotPassword;
