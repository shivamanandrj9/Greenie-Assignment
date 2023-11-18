import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./User.css";
const MyForm = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [token, setToken] = useState(null);
  const location = useLocation();
  const token1 = props.token;
  useEffect(() => {
    console.log("Submitted:", inputValue);
    const cookie = document.cookie;
    const cookieArray = cookie.split("; ");
    const desiredCookie = cookieArray?.find((item) =>
      item.startsWith("access_token=")
    );
    setToken(desiredCookie?.split("=")[1]);
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform actions with the input value (inputValue)

    if (inputValue) {
      if (token) {
        //   const cookieValue = desiredCookie?.split("=")[1];

        // You can perform further actions, like sending data to a server
        try {
          const response = await axios.put(
            "http://localhost:3001/auth/update",
            {
              phone: inputValue,
              token: token1,
            }
          );
          if (response.data.success === false) {
            toast.error("Some Error occured");
          }
          if (response.data.success) {
            //   console.log(response.data);
            // setIsAdmin(response.data.isAdmin);
            toast.success("Update Successful");
            //   setCookies("access_token", response.data.token);
            //   window.localStorage.setItem("userID", response.data.userID);
            //   navigate("/dashboard",{state:response.data.isAdmin});
            //   console.log("Logged in");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else {
      toast.error("Some error occured");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div
        className="userDashboard"
        style={{
          backgroundColor: "rgb(68 40 40)",
          padding: "20px",
          borderRadius: "8px",
          // maxWidth: '400px',
          margin: "auto",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "400px" }}>
          <span>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Update Phone Number
            </h2>
          </span>
          <button style={{ marginRight: "1vw" }} onClick={handleLogout}>
            Logout
          </button>
          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              New Phone Number:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter new number"
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyForm;
