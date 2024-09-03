import OuterLayout from "../components/layouts/OuterLayout";
import AllUsers from "../components/User/AllUsers";
import ChatHeader from "../components/layouts/ChatHeader";
import CreatePost from "../components/User/CreatePost";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth] = useAuth();
  return (
    <OuterLayout>
      {auth?.token ? (
        <>
          <div className="container text-center">
            <div className="structur">
              <div className="col-8 bc-move">
                <AllUsers />
              </div>
              <div className="col-4">
                <ChatHeader />
                <CreatePost />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <h1>Welcome</h1>
          </div>
        </>
      )}
    </OuterLayout>
  );
};

export default HomePage;
