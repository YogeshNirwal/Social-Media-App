import React, { useEffect, useState } from "react";
import OuterLayout from "../layouts/OuterLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { MdInsertComment } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { GrSend } from "react-icons/gr";
import moment from "moment";
import UpdateForm from "../UpdateForm";
import { Modal } from "antd";

const CommentPost = () => {
  const params = useParams();
  const [auth] = useAuth();
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");
  const [post, setPost] = useState("");
  const [selected, setSelected] = useState("");
  const [showReplyCommentId, setShowReplyCommentId] = useState("");
  const [visible, setVisible] = useState(false);
  const [reply, setReply] = useState(false);
  const [updateComment, setUpdateComment] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (params?.pid && auth?.user._id) getpost();
    setPostId(params?.pid);
    setUserId(auth?.user._id);
  }, [params?.pid, auth?.user._id, getpost, post]);
  //getpost
  const getpost = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/api/v1/post/get-post/${params.pid}`
      );
      setPost(data?.post);
    } catch (error) {
      console.log(error);
    }
  };

  //post comment
  const postComment = async (content) => {
    try {
      const { data } = await axios.post(
        `${window.location.origin}/api/v1/comment/create-comment `,
        { userId, postId, content }
      );
      if (data.success) {
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in inputText");
    }
  };

  //get all comments this post

  const getAllComments = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/api/v1/comment/get-comment/${params.pid}`
      );
      setComments(data?.comments);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in gatting comments");
    }
  };
  useEffect(() => {
    if (params?.pid) {
      getAllComments();
    }
  }, [params?.pid, comments, getAllComments]);

  //delete comment

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${window.location.origin}/api/v1/comment/delete-comment/${commentId}`
      );
      toast.success("comment deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in delete comment");
    }
  };

  // comment update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${window.location.origin}/api/v1/comment/edit-comment/${selected._id}`,
        { content: updateComment }
      );
      if (data?.success) {
        toast.success(`${updateComment} is updated`);
        setSelected(null);
        setUpdateComment("");
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${window.location.origin}/api/v1/comment/reply-comment/${selected._id}`,
        {
          userId,
          content: updateComment,
        }
      );
      if (data?.success) {
        toast.success(`${updateComment} is updated`);
        setSelected(null);
        setUpdateComment("");
        setReply(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <OuterLayout>
        <div className="container text-center">
          <div className="structur">
            <div className="col-5 ">
              <div className="card m-auto mt-3" style={{ width: "25rem" }}>
                <div className="card-header fw-bold">{post.name}</div>
                <img
                  src={`${window.location.origin}/api/v1/post/post-photo/${post._id}`}
                  className="card-img-top"
                  style={{ height: "30rem" }}
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text">{post.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-around text-body-secondary">
                  <div style={{ width: "30%" }}>
                    <BiSolidLike />
                  </div>
                  <div style={{ width: "30%" }}>
                    <MdInsertComment />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7 comment">
              <div className="comments-section">
                <h1>Comments</h1>
                {comments.map((comment) => {
                  return (
                    <>
                      <section className="gradient-custom ms-5 mb-2">
                        <div className="container  ">
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-12 col-lg-10 col-xl-20">
                              <div className="card">
                                <div className="card-body p-4">
                                  <div className="row">
                                    <div className="col">
                                      <div className="d-flex flex-start">
                                        <img
                                          className="rounded-circle shadow-1-strong me-3"
                                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                                          alt="avatar"
                                          width={65}
                                          height={65}
                                        />
                                        <div className="flex-grow-1 flex-shrink-1">
                                          <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                              <p className="mb-1 fw-bold">
                                                {comment.userId.name}
                                                <span className="small ms-3">
                                                  -
                                                  {moment
                                                    .utc(comment?.createdAt)
                                                    .local()
                                                    .fromNow()}
                                                </span>
                                              </p>
                                            </div>
                                            <p className="small mb-0">
                                              {comment.content}
                                            </p>
                                          </div>

                                          <div className="d-flex flex-column flex-start mt-4">
                                            {comment._id ===
                                            showReplyCommentId ? (
                                              <>
                                                {comment.replies.map(
                                                  (reply) => {
                                                    return (
                                                      <>
                                                        <div
                                                          className="d-flex mt-3"
                                                          key={reply._id}
                                                        >
                                                          <a className="me-3">
                                                            <img
                                                              className="rounded-circle shadow-1-strong"
                                                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                                                              alt="avatar"
                                                              width={65}
                                                              height={65}
                                                            />
                                                          </a>
                                                          <div className="flex-grow-1 flex-shrink-1">
                                                            <div>
                                                              <div className="d-flex justify-content-between align-items-center">
                                                                <p className="mb-1 fw-bold">
                                                                  {
                                                                    reply.userId
                                                                      .name
                                                                  }
                                                                  <span className="small ms-1">
                                                                    -
                                                                    {moment
                                                                      .utc(
                                                                        comment?.createdAt
                                                                      )
                                                                      .local()
                                                                      .fromNow()}
                                                                  </span>
                                                                </p>
                                                              </div>
                                                              <p className="small mb-0">
                                                                {reply.content}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <ul className="list-group list-group-horizontal mt-2">
                                    <li
                                      className="list-group-item cursor"
                                      onClick={() => {
                                        setVisible(true);
                                        setUpdateComment(comment.content);
                                        setSelected(comment);
                                      }}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className="list-group-item cursor"
                                      onClick={() => {
                                        setReply(true);
                                        setUpdateComment("");
                                        setSelected(comment);
                                      }}
                                    >
                                      Reply
                                    </li>
                                    <li
                                      className="list-group-item cursor"
                                      onClick={() => {
                                        setShowReplyCommentId(comment._id);
                                      }}
                                    >
                                      Show Reply
                                    </li>
                                    <li
                                      className="list-group-item cursor"
                                      onClick={() => {
                                        deleteComment(comment._id);
                                      }}
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <Modal
                        onCancel={() => setVisible(false)}
                        footer={null}
                        visible={visible}
                      >
                        <UpdateForm
                          value={updateComment}
                          setValue={setUpdateComment}
                          handleSubmit={handleUpdate}
                        />
                      </Modal>
                      <Modal
                        onCancel={() => setReply(false)}
                        footer={null}
                        visible={reply}
                      >
                        <UpdateForm
                          value={updateComment}
                          setValue={setUpdateComment}
                          reply={reply}
                          handleSubmit={handleReply}
                        />
                      </Modal>
                    </>
                  );
                })}

                <div className="commentContent">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={1}
                  />
                  <button
                    className="btn-secondary"
                    onClick={() => postComment(content)}
                  >
                    <h3>
                      <GrSend />
                    </h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OuterLayout>
    </>
  );
};

export default CommentPost;
