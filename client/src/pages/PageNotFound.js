import React from "react";
import OuterLayout from "../components/layouts/OuterLayout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <OuterLayout>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">404</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 fs-5 fw-normal">Oops! PAge Not Found</p>
          <Link
            to={"/"}
            className=" nav-link  border border-success bg-success bg-opacity-10 rounded"
          >
            Go to home
          </Link>
        </div>
      </div>
    </OuterLayout>
  );
};

export default PageNotFound;
