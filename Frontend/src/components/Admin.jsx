import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = (props) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    const cookie = document.cookie;
    const cookieArray = cookie.split("; ");
    const desiredCookie = cookieArray.find((item) =>
      item.startsWith("access_token=")
    );
    // if (desiredCookie) {
    const cookieValue = desiredCookie?.split("=")[1];
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/admin/getUsers",
          {
            //   phone: inputValue,
            token: cookieValue,
          }
        );
        const data = response.data; // Accessing data directly from Axios response
        if (data.success) {
          setUsers(data.list);
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (searchInput !== "") {
      const filtered = users.filter(
        (user) =>
          user.userEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.phone.includes(searchInput)
      );
      setFilteredUsers(filtered);
    }
  }, [searchInput]);

  return (
    <div className="userscontainer">
      <button onClick={handleLogout} style={{ marginRight: "-85vw" }}>
        Logout
      </button>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
        User List
      </h2>
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100%",
          margin: "20px",
          color: "#000",
          backgroundColor: "rgb(163 149 149)",
        }}
      />
      <div className="table-container">
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0", color: "black" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                User Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                User Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                User Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers
              ? filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "black",
                      }}
                    >
                      {user.userName}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "black",
                      }}
                    >
                      {user.userEmail}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "black",
                      }}
                    >
                      {user.phone}
                    </td>
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "black",
                      }}
                    >
                      {user.userName}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "black",
                      }}
                    >
                      {user.userEmail}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "black",
                      }}
                    >
                      {user.phone}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
