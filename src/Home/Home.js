import React from "react";

const Home = () => {
  return (
    <div
      style={{
        textAlign: "center",
        // border: "1px solid red",
        marginTop: "10rem",
        width: "60%",
        marginLeft: "15rem",
        padding:"2rem",
        boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
      }}
    >
      <h2>Expense Tracker</h2>
      <hr />
      <span style={{color:"green"}}><strong>Your Money Manager</strong></span>
      <br />
    </div>
  );
};

export default Home;
// "rgba(0, 0, 0, 0.35) 0px 5px 15px"