import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("/admin-panel", {
      method: "POST",
      body: JSON.stringify({
        role: "BASIC",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.str);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <h1>{data}</h1>
    </div>
  );
}

export default AdminPanel;
