import { useContext } from "react";
import { AuthContext } from "../auth/AuthContextProvider";

const Landing = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="content flex-center">
      <div style={{ width: '60%' }}>
        <div className="flex-center">
          {auth && localStorage.getItem('role') === 'admin' ? (
            <h1 className="large text-primary">Welcome to administrative page</h1>
          ) :
          auth && localStorage.getItem('role') === 'regular' ? (
            <h1 className="large text-primary">Welcome to restaurant reservation organizer</h1>
          ) : (
            <h1 className="large text-primary">Welcome! Please login first</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
