import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
function OuterLayout({
  children,
  title = "DEEP_COMMENT_CHAT APP",
  description = "deep socialMedia  wabshite ",
  keywords = "post,comment,mobile,reel",
  author = "Yogesh Nirwal",
}) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <Toaster />
      <main style={{ minHeight: "54vh" }}>{children}</main>
    </>
  );
}

export default OuterLayout;
