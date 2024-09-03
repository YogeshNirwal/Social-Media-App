import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const ChatHeader = () => {
  const [auth] = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary z-0 ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand">{auth?.user.name}</Link>
          </div>
          <div></div>
        </div>
      </nav>
    </>
  );
};
export default ChatHeader;
