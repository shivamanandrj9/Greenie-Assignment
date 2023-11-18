import React from "react";
import { useLocation } from "react-router-dom";
import Admin from "../components/Admin";
import User from "../components/User";

const Dashboard = () => {
  const location = useLocation();
  console.log(location.state, location.token);
  const {state} = location;
  return (
    <>
      {/* {location.state} */}
      {state.isAdmin ? (
        <Admin token={state?.token} />
      ) : (
        <User token={state?.token} />
      )}
    </>
  );
};

export default Dashboard;
